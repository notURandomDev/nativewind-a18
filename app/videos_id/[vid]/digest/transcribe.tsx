import { View, Text, ScrollView, Alert, TextStyle, Image, TouchableOpacity } from 'react-native';
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
import CustomContextMenu, {
  CustomContextMenuCbProps,
  CustomContextMenuProps,
} from 'components/ContextMenu';
import {
  deleteTranscriptionData,
  getTranscriptionData,
  updateTranscriptionData,
} from 'storage/transcriptionStorage';
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
    text: '尊敬的各位领导，各位来宾，现场的媒体朋友们，大家上午好。欢迎来到AI引领智取新城西湖论剑及安肯西西年度新品发布会的现场。我是今天发布会的主持人陈',
    card: '{"terms": [{"term": "西湖论剑", "positions": [[40, 43]], "explanation": "西湖论剑是中国信息安全领域的重要会议之一，通常涉及网络安全、数据保护、隐私安全等议题，是业内专业人士交流和分享最新研究成果和技术趋势的平台。"}, {"term": "安肯西西", "positions": [[45, 48]], "explanation": "安肯西西（Anken Xixi）可能是指某家专注于网络安全或信息安全的公司，其名称在行业内具有一定的知名度，通常参与或举办与网络安全相关的技术交流和产品发布活动。"}]}',
  },
  timestamp: 1743003061496,
  type: 'enhanced',
};

// const URL_REAL_BACKEND = `http://10.249.12.195:8088/subscribe?audioFilePath=D:%5C%5Coutput_audio.pcm`;
const URL_REAL_BACKEND = `http://10.249.18.189:8088/subscribe`;
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
    // sendEventSourceDevRequest(SSE_RES_4_TESTING_NO_CARDS);
    sendEventSourceGetRequest(
      `${URL_REAL_BACKEND}?lastEventId=${lastEventIdRef.current}&taskKey=${taskKeyRef.current}`
    );
  };

  const endES = () => {
    console.log(`es-terminated-${Date.now()}`);
    terminateEventSourceConnection();
  };

  useEffect(() => {
    return () => {
      endES();
    };
  }, []);

  useEffect(() => {
    console.log('currentTranscription:', currentTranscription);
  }, [currentTranscription]);

  useEffect(() => {
    getTranscriptionDataAsync();
  }, [taskKeyRef.current]);

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
      onContentSizeChange={() => scrollviewRef.current?.scrollToEnd({ animated: true })}
      ref={scrollviewRef}
      contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        gap: 12,
        backgroundColor: '#ffffff',
        paddingHorizontal: 28,
        // paddingBottom: 285,
      }}>
      <View className="gap-4">
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
          <View
            className="flex-1 gap-3 bg-white px-4"
            style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 }}>
            <Text className="text-lg font-medium">{`taskKey: ${taskKeyRef.current}`}</Text>
            {MemoizedParagraphs}
            {currentTranscription && (
              <View className="bg-blue-faint">
                <HighlightableParagraph
                  modifyNoteTagCb={handleNoteTagModify}
                  noteTag="none"
                  type={currentTranscription.type}
                  key={`paragraph-${currentTranscription.timestamp}`}
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

const HighlightableParagraph = ({
  sentence,
  type,
  noteTag = 'none',
  modifyNoteTagCb,
}: HighlightableParagraphProps) => {
  const [isActive, setIsActive] = useState(false);

  const textDecorationStyles: { [key in NoteTags]: TextStyle } = {
    none: {
      backgroundColor: isActive ? '#F5F8FF' : '',
    },
    mark: {
      textDecorationStyle: 'double',
      textDecorationLine: 'underline',
      textDecorationColor: '#F66348',
    },
    todo: {
      textDecorationStyle: 'solid',
      textDecorationLine: 'underline',
      textDecorationColor: '#FFD84E',
    },
    question: {
      textDecorationStyle: 'dotted',
      textDecorationLine: 'underline',
      textDecorationColor: '#00BBFF',
    },
  };

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
  };

  const handleLongPress = () => {
    setIsActive(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    console.log('on-long-press');
  };

  const hasTerms = sentence?.card && JSON.parse(sentence.card)['terms'].length;
  // 如果是未增强过的转录数据，或增强过的转录数据中知识卡片数组为空，就直接将原句返回
  if (type === 'raw' || !hasTerms) {
    return (
      <TouchableOpacity
        className="relative"
        activeOpacity={1}
        onLongPress={handleLongPress}
        onPress={handlePress}>
        <Text style={[{ lineHeight: 26 }, textDecorationStyles[noteTag]]}>
          <Text>{sentence.text}</Text>
        </Text>
        {isActive && <CustomContextMenu cbs={cbs} currentTag={noteTag} />}
      </TouchableOpacity>
    );
  }

  // 如果调用了该函数，则代表句子中一定有知识卡片，需要进行分割
  const segmentedSentence = segmentSentence(sentence);

  return (
    <TouchableOpacity
      className="relative"
      activeOpacity={1}
      onLongPress={handleLongPress}
      onPress={handlePress}>
      <Text style={[{ lineHeight: 26 }, isActive && textDecorationStyles[noteTag]]}>
        {
          // 对切片数组进行遍历
          // 通过判断是不是知识卡片，返回相应的样式
          segmentedSentence.map((segment) =>
            segment.isTerm ? (
              <Text
                key={segment.segmentId}
                suppressHighlighting={true}
                onPress={() => Alert.alert(segment.text, segment.explanation)}
                className="text-blue">
                {segment.text}
              </Text>
            ) : (
              <Text key={segment.segmentId}>{segment.text}</Text>
            )
          )
        }
      </Text>
      {isActive && <CustomContextMenu cbs={cbs} currentTag={noteTag} />}
    </TouchableOpacity>
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

  let plainTextStartIndex = 0;
  // 对知识卡片数组进行遍历
  terms.forEach((term: KnowledgeDataProps, index) => {
    const [termTextStartIndex, termTextEndIndex] = term.positions[0];

    // 1. 先把当前知识卡片之前的普通文本push到切片数组中
    // 如果两个term不是连在一起的，才用对plainText进行切割
    if (plainTextStartIndex !== termTextStartIndex) {
      const plainText = sentence.text.slice(plainTextStartIndex, termTextStartIndex);
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
  if (plainTextStartIndex < sentence.text.length) {
    const remainingText = sentence.text.slice(plainTextStartIndex);
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
