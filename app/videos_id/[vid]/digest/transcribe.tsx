import {
  View,
  Text,
  ScrollView,
  Alert,
  TextStyle,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
  ViewStyle,
  BoxShadowValue,
} from 'react-native';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import TintedBackground from 'components/TintedBackground';
import ButtonAllinOne from 'components/ButtonAllinOne';
import BottomIndicator from 'components/BottomIndicator';
import EventSource, { EventSourceEvent } from 'react-native-sse';
import * as Haptics from 'expo-haptics';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

import TRANSCRIPTION_DATA from '../../../../test/enhance_output_cards.json';
import { MyCustomEvents } from 'hooks/useSSE';
import { useSSE } from 'hooks/useSSE';
import CustomContextMenu, { CustomContextMenuCbProps } from 'components/ContextMenu';
import {
  deleteTranscriptionData,
  getTranscriptionData,
  updateTranscriptionData,
} from 'storage/transcriptionStorage';
import { TRANSCRIPTION_WITH_CARD_FULL_DATA } from 'data/enhance_output_cards';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatTime } from 'utils/formatTime';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ColorValue } from 'react-native';
TRANSCRIPTION_DATA.sort((a, b) => a.sentenceId - b.sentenceId);

const SSE_RES_4_TESTING_NO_CARDS = {
  _final: true,
  data: {
    beginTime: 16600,
    index: 0,
    taskKey: '1743003043014',
    text: '尊敬的各位领导，各位来宾，现场的媒体朋友们，大家上午好。欢迎来到AI引领智取新城西湖论剑及安肯西西年度新品发布会的现场。我是今天发布会的主持人陈',
  },
  timestamp: 1743003061496,
  type: 'raw',
};

const SSE_RES_4_TESTING_WITH_CARDS = {
  _final: false,
  data: {
    beginTime: 16600,
    index: 0,
    taskKey: '1743003043014',
    text: '"尊敬的各位领导，各位来宾，现场的媒体朋友们，大家上午好。欢迎来到AI引领智取新城西湖论剑及安肯西西年度新品发布会的现场。我是今天发布会的主持人陈"',
    card: '{"terms": [{"term": "西湖论剑", "positions": [[40, 43]], "explanation": "西湖论剑是中国信息安全领域的重要会议之一，通常涉及网络安全、数据保护、隐私安全等议题，是业内专业人士交流和分享最新研究成果和技术趋势的平台。"}, {"term": "安肯西西", "positions": [[45, 48]], "explanation": "安肯西西（Anken Xixi）可能是指某家专注于网络安全或信息安全的公司，其名称在行业内具有一定的知名度，通常参与或举办与网络安全相关的技术交流和产品发布活动。"}]}',
  },
  timestamp: 1743003061496,
  type: 'missedEnhanced',
};

// const URL_REAL_BACKEND = `http://10.249.12.195:8088/subscribe?audioFilePath=D:%5C%5Coutput_audio.pcm`;
const URL_REAL_BACKEND = `http://192.168.184.53:8088/subscribe`;
// const DEFAULT_TASKKEY = 'temporary-task-key';
const DEFAULT_TASKKEY = 'meeting1';
interface KnowledgeDataProps {
  term: string;
  explanation: string;
  positions: Array<Array<number>>;
}

interface SentenceProps {
  beginTime?: number;
  text: string;
  index: number;
  taskKey: string;
  card?: string;
}

export type NoteTags = 'none' | 'question' | 'todo' | 'mark';
export interface TranscriptionProps {
  _final: boolean;
  data: SentenceProps;
  timestamp: bigint;
  type: 'raw' | 'enhanced' | 'missedEnhanced';
  noteTag: NoteTags;
}

const RealtimeTranscribe = () => {
  const [transcription, setTranscription] = useState<TranscriptionProps[] | []>([]);
  // const [transcription, setTranscription] = useState('');
  const [currentTranscription, setCurrentTranscription] = useState<TranscriptionProps | null>();
  const [loading, setLoading] = useState(false);

  const taskKeyRef = useRef<string>(DEFAULT_TASKKEY);
  const lastEventIdRef = useRef<number>(0);
  const scrollviewRef = useRef<ScrollView>(null);

  const onMeetingCreated = (event: EventSourceEvent<MyCustomEvents>) => {
    if (event.data) {
      const res = JSON.parse(event.data);
      console.log('taskKey', res);
      taskKeyRef.current = res.taskKey;
    }
  };

  const onTranscription = (event: EventSourceEvent<MyCustomEvents>) => {
    if (event.data) {
      const newTranscription: TranscriptionProps = JSON.parse(event.data);
      console.log('newTranscription received', newTranscription);

      if (newTranscription.type === 'enhanced') {
        const eventId = newTranscription.data.index;
        setTranscription((prev) =>
          prev.map((item, index) => (index === eventId ? newTranscription : item))
        );
        lastEventIdRef.current = eventId;
      } else if (newTranscription.type === 'missedEnhanced') {
        setTranscription((prev) => [...prev, newTranscription]);
      } else if (newTranscription.type === 'raw') {
        if (newTranscription._final) {
          if (transcription.length) {
            setTranscription((prev) => [...prev, newTranscription]);
          } else {
            setTranscription([newTranscription]);
          }
          setCurrentTranscription(null);
        } else {
          if (currentTranscription) {
            setCurrentTranscription((prev) => {
              if (prev) {
                const {
                  data: { text, ...dataRest },
                  ...rest
                } = prev;
                return { ...rest, data: { text: newTranscription.data.text, ...dataRest } };
              }
              return prev; // Ensure a valid return value
            });
          } else {
            setCurrentTranscription(newTranscription);
          }
        }
      }
    }
  };

  const onClose = () => {
    updateTranscriptionDataAsync();
    console.log('on es close');
  };

  const { terminateEventSourceConnection, sendEventSourceGetRequest, sendEventSourceDevRequest } =
    useSSE({
      onOpen: () => console.log(`es-opened-${Date.now()}`),
      onTranscription,
      onMessage: onTranscription,
      onComplete: onClose,
      onClose: onClose,
      onMeetingCreated,
    });

  const handleNoteTagModify: ModifyNoteTagCbProps = (index, newNoteTag) => {
    setTranscription((prev) => {
      const newData = prev.map((item) => {
        if (item.data.index === index) {
          return {
            ...item,
            noteTag: newNoteTag,
          };
        }
        return item;
      });
      updateTranscriptionDataAsync();
      return newData;
    });
  };

  const MemoizedParagraphs = useMemo(
    () =>
      transcription.map((item) => (
        <HighlightableParagraph
          modifyNoteTagCb={handleNoteTagModify}
          noteTag={item.noteTag}
          type={item.type}
          key={`paragraph-${item.timestamp}`}
          sentence={item.data}
        />
      )),
    [transcription]
  );

  const startES = () => {
    setLoading(true);
    // sendEventSourceDevRequest(SSE_RES_4_TESTING_WITH_CARDS);
    console.log(`lastEventIdRef:`, lastEventIdRef.current);
    console.log(`taskKeyRef:`, taskKeyRef.current);
    sendEventSourceGetRequest(
      `${URL_REAL_BACKEND}?lastEventId=${lastEventIdRef.current}&taskKey=${taskKeyRef.current}`
    );
  };

  const endES = () => {
    console.log(`es-terminated-${Date.now()}`);
    terminateEventSourceConnection();
  };

  useEffect(() => {
    startES();
    setTimeout(() => {
      // setTranscription([SSE_RES_4_TESTING_WITH_CARDS]);
      setTranscription(TRANSCRIPTION_WITH_CARD_FULL_DATA.slice(0, 43));
    }, 100);
    return () => {
      endES();
    };
  }, []);

  useEffect(() => {
    console.log('currentTranscription:', currentTranscription);
  }, [currentTranscription]);

  /* useEffect(() => {
    getTranscriptionDataAsync();
  }, [taskKeyRef.current]); */

  const getTranscriptionDataAsync = async () => {
    const { transcriptionData = [], lastEventIndex = 0 } = await getTranscriptionData(
      taskKeyRef.current
    );
    setTranscription(transcriptionData);
    lastEventIdRef.current = lastEventIndex;
  };

  const updateTranscriptionDataAsync = () => {
    updateTranscriptionData(taskKeyRef.current, transcription, lastEventIdRef.current);
  };

  const deleteTranscriptionDataAsync = async () => {
    Alert.alert(taskKeyRef.current, `你确定要删除转录数据吗？`, [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: async () => {
          await deleteTranscriptionData(taskKeyRef.current);
          setTranscription([]);
        },
      },
    ]);
  };

  return (
    <ScrollView
      onContentSizeChange={() => {
        scrollviewRef.current?.scrollToEnd({ animated: true });
      }}
      ref={scrollviewRef}
      contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        gap: 12,
        backgroundColor: '#ffffff',
        paddingHorizontal: 28,
        // paddingBottom: 285,
      }}>
      <View className="relative gap-4">
        <TintedBackground label="实时转写">
          <View className="flex-row justify-between">
            <ButtonAllinOne disabled={loading} onPress={startES}>
              <Text className="text-white">开始测试</Text>
            </ButtonAllinOne>
            <ButtonAllinOne variant="ghost" onPress={deleteTranscriptionDataAsync}>
              <Text style={{ color: '#F66348' }}>删除转录数据</Text>
            </ButtonAllinOne>
            <ButtonAllinOne onPress={endES} variant="outline" label="结束测试" />
          </View>
          {/* <Text className="text-lg font-medium">{`taskKey: ${taskKeyRef.current}`}</Text> */}
          <View className="flex-1 gap-3">
            {MemoizedParagraphs}
            {currentTranscription && (
              <View className="bg-blue-faint">
                <HighlightableParagraph
                  modifyNoteTagCb={handleNoteTagModify}
                  noteTag="none"
                  type={currentTranscription.type}
                  key={`temp-paragraph-${currentTranscription.timestamp}`}
                  sentence={currentTranscription.data}
                />
              </View>
            )}
          </View>
        </TintedBackground>
      </View>

      <BottomIndicator />
    </ScrollView>
  );
};

interface ModifyNoteTagCbProps {
  (index: number, newNoteTag: NoteTags): void;
}

interface HighlightableParagraphProps {
  sentence: SentenceProps;
  type: 'enhanced' | 'raw' | 'missedEnhanced';
  noteTag: NoteTags;
  modifyNoteTagCb: ModifyNoteTagCbProps;
}

const SHADOW_OPACITY = 0.01;
const NoteHighlightConfig: {
  [key in NoteTags]: {
    borderColor: ColorValue;
    backgroundColor: ColorValue;
    boxShadow: string;
    textStyles: TextStyle;
  };
} = {
  none: {
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    boxShadow: `0 4px 12px rgba(0,0,0,${SHADOW_OPACITY})`,
    textStyles: {
      textDecorationLine: 'none',
    },
  },
  mark: {
    borderColor: '#F66348',
    backgroundColor: 'rgba(246,99,72,0.1)',
    boxShadow: `0 4px 12px rgba(246,99,72,${SHADOW_OPACITY})`,
    textStyles: {
      textDecorationStyle: 'double',
      textDecorationLine: 'underline',
      textDecorationColor: '#F66348',
    },
  },
  todo: {
    borderColor: '#FFD84E',
    backgroundColor: 'rgba(255,216,78,0.1)',
    boxShadow: `0 4px 12px rgba(255,216,78,${SHADOW_OPACITY})`,
    textStyles: {
      textDecorationStyle: 'solid',
      textDecorationLine: 'underline',
      textDecorationColor: '#FFD84E',
    },
  },
  question: {
    borderColor: '#00BBFF',
    backgroundColor: 'rgba(0,187,255,0.1)',
    boxShadow: `0 4px 12px rgba(0,187,255,${SHADOW_OPACITY})`,
    textStyles: {
      textDecorationStyle: 'dotted',
      textDecorationLine: 'underline',
      textDecorationColor: '#00BBFF',
    },
  },
};

const HighlightableParagraph = ({
  sentence,
  type,
  noteTag = 'none',
  modifyNoteTagCb,
}: HighlightableParagraphProps) => {
  const [isActive, setIsActive] = useState(false);

  const borderColor = useSharedValue('#ffffff');
  const scaleSize = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderWidth: 1,
      borderColor: borderColor.value,
      transform: [{ scale: scaleSize.value }],
    };
  });

  useEffect(() => {
    if (isActive) {
      borderColor.value = withTiming(NoteHighlightConfig[noteTag].borderColor.toString(), {
        duration: 100,
      });
    } else {
      borderColor.value = withTiming(
        noteTag === 'none' ? '#ffffff' : NoteHighlightConfig[noteTag].borderColor.toString(),
        { duration: 200 }
      );
    }
  }, [isActive]);

  const withActiveCb = (fn: () => void) => {
    fn();
    setIsActive(false);
  };

  const cbs: CustomContextMenuCbProps = {
    onMark: () => withActiveCb(() => modifyNoteTagCb(sentence.index, 'mark')),
    onQuestion: () => withActiveCb(() => modifyNoteTagCb(sentence.index, 'question')),
    onTodo: () => withActiveCb(() => modifyNoteTagCb(sentence.index, 'todo')),
    onReset: () => withActiveCb(() => modifyNoteTagCb(sentence.index, 'none')),
  };

  const handlePress = () => {
    if (isActive) setIsActive(false);
    DeviceEventEmitter.emit('seekVideo', sentence.beginTime);
    scaleSize.value = withTiming(0.95, { duration: 100 }, () => {
      scaleSize.value = withTiming(1, { duration: 100 });
    });
  };

  const handleLongPress = () => {
    setIsActive(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    console.log('on-long-press');
  };

  const SentenceWrapper = ({ children }: { children: ReactNode }) => (
    <TouchableOpacity
      className="relative gap-1"
      activeOpacity={1}
      onLongPress={handleLongPress}
      onPress={handlePress}>
      <View className="flex-row items-center gap-1 px-2">
        <Ionicons name="caret-forward-circle-outline" />
        <Text className="text-lg">
          {formatTime(Math.round(sentence.beginTime ? sentence.beginTime / 1000 : 0))}
        </Text>
      </View>
      <Animated.View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 10,
            boxShadow: NoteHighlightConfig[noteTag].boxShadow,
          },
          animatedStyle,
          { backgroundColor: NoteHighlightConfig[noteTag].backgroundColor },
        ]}
        className="bg-white">
        {children}
        {isActive && <CustomContextMenu cbs={cbs} currentTag={noteTag} />}
      </Animated.View>
    </TouchableOpacity>
  );

  const hasTerms = sentence?.card && JSON.parse(sentence.card)['terms'].length;
  // 如果是未增强过的转录数据，或增强过的转录数据中知识卡片数组为空，就直接将原句返回
  if (type === 'raw' || !hasTerms) {
    return (
      <SentenceWrapper>
        <Animated.Text className="font-light" style={[{ lineHeight: 26, fontSize: 15 }]}>
          <Text>{sentence.text}</Text>
        </Animated.Text>
      </SentenceWrapper>
    );
  }

  // 如果调用了该函数，则代表句子中一定有知识卡片，需要进行分割
  const segmentedSentence = segmentSentence(sentence);
  // 对切片数组进行遍历
  // 通过判断是不是知识卡片，返回相应的样式
  const ReassembledSentence = () => (
    <Animated.Text className="font-light" style={[{ lineHeight: 26, fontSize: 15 }]}>
      {segmentedSentence.map((segment) =>
        segment.isTerm ? (
          <Text
            key={segment.segmentId}
            suppressHighlighting={true}
            onPress={() => {
              Alert.alert(segment.text, segment.explanation);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            className="text-blue">
            {segment.text}
          </Text>
        ) : (
          <Text key={segment.segmentId}>{segment.text}</Text>
        )
      )}
    </Animated.Text>
  );

  return (
    <SentenceWrapper>
      <ReassembledSentence />
    </SentenceWrapper>
  );
};

interface SentenceSegmentProps {
  segmentId: string;
  text: string;
  isTerm: boolean;
  explanation?: string;
}

// 该函数在一句话的基础上进一步分割（知识卡片）
const segmentSentence = (sentence: SentenceProps) => {
  // 将一句话进行分割后的结果
  const segments: Array<SentenceSegmentProps> = [];
  // 将句子中的知识卡片数据反序列化
  const terms: Array<KnowledgeDataProps> = sentence.card && JSON.parse(sentence.card).terms;

  // 如果card是一个空数组，就不用进行分割，直接返回原始句子
  /* if (!terms.length) {
    return [{ text: sentence.text, isTerm: false, segmentId: `sentence-${sentence.id}-no-card` }];
  } */

  // const parsedText = JSON.parse(sentence.text);
  const parsedText = sentence.text;

  let plainTextStartIndex = 0;
  // 对知识卡片数组进行遍历
  terms.forEach((term: KnowledgeDataProps, index) => {
    if (!term.positions.length) {
      const segmentId = `sentence-${sentence.index}-invalid-term-segment-${index}`;
      segments.push({
        text: term.term,
        isTerm: false,
        segmentId,
      });
      return;
    }

    const [termTextStartIndex, termTextEndIndex] = term.positions[0];

    // 1. 先把当前知识卡片之前的普通文本push到切片数组中
    // 如果两个term不是连在一起的，才用对plainText进行切割
    if (plainTextStartIndex !== termTextStartIndex) {
      const plainText = parsedText.slice(plainTextStartIndex, termTextStartIndex);
      const segmentId = `sentence-${sentence.index}-segment-${index}-plain-${plainTextStartIndex}`;
      segments.push({
        text: plainText,
        isTerm: false,
        segmentId,
      });
    }

    // 2. 再将当前遍历到的知识卡片push到切片数组中
    const segmentId = `sentence-${sentence.index}-segment-${index}-term`;
    segments.push({
      text: term.term,
      isTerm: true,
      explanation: term.explanation,
      segmentId,
    });

    // 更新普通文本的起始index
    plainTextStartIndex = termTextEndIndex + 1;
  });

  // 如果最后一张知识卡片不是位于一句话的末尾，要将最后一张知识卡片之后的普通文本进行切片，并push到切片数组中
  if (plainTextStartIndex < parsedText.length) {
    const remainingText = parsedText.slice(plainTextStartIndex);
    const segmentId = `sentence-${sentence.index}-segment-last-text`;
    segments.push({
      text: remainingText,
      isTerm: false,
      segmentId,
    });
  }

  return segments;
};

export default RealtimeTranscribe;
