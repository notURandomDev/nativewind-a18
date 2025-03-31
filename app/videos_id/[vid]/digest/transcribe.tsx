import { View, Text, ScrollView, Alert, TextStyle } from 'react-native';
import React, { useRef, useState } from 'react';
import TintedBackground from 'components/TintedBackground';
import ButtonAllinOne from 'components/ButtonAllinOne';
import BottomIndicator from 'components/BottomIndicator';
import EventSource, { EventSourceEvent } from 'react-native-sse';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

import TRANSCRIPTION_DATA from '../../../../test/enhance_output_cards.json';
import { MyCustomEvents } from 'hooks/useSSE';
import { useSSE } from 'hooks/useSSE';
TRANSCRIPTION_DATA.sort((a, b) => a.sentenceId - b.sentenceId);

const SSE_RES_4_TESTING_NO_CARDS = {
  _final: false,
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

// 将 JSON 对象转为查询字符串
const queryString = new URLSearchParams({
  jsonobj: JSON.stringify(SSE_RES_4_TESTING_WITH_CARDS),
}).toString();

const URL_SSE_DEV = `https://sse.dev/test?${queryString}`;
const URL_REAL_BACKEND = `http://192.168.125.53:8088/subscribe/${Date.now().toString()}?audioFilePath=D:%5C%5Coutput_audio.pcm`;

interface KnowledgeDataProps {
  term: string;
  explanation: string;
  positions: Array<Array<number>>;
}

/* interface SentenceProps {
  sentenceId: string;
  text: string;
  startTime: number;
  endTime: number;
  card: string;
} */

// new scheme
interface SentenceProps {
  beginTime?: number;
  text: string;
  index: number;
  taskKey: string;
  id: string;
  card?: string;
}

interface TranscriptionProps {
  _final: boolean;
  data: SentenceProps;
  id: string;
  timestamp: bigint;
  type: 'raw' | 'enhanced';
}

const RealtimeTranscribe = () => {
  const [transcription, setTranscription] = useState<Array<TranscriptionProps>>([]);
  const [loading, setLoading] = useState(false);

  const onTranscription = (event: EventSourceEvent<MyCustomEvents>) => {
    if (event.data) {
      const newTranscription: TranscriptionProps = JSON.parse(event.data);
      console.log('newTranscription received', newTranscription);
      const { id, ...rest } = newTranscription;
      setTranscription((prev) => [...prev, { id: Date.now().toString(), ...rest }]);
    }
  };
  const onClose = () => {
    console.log('on es close');
  };

  const { terminateEventSourceConnection, sendEventSourcePostRequest, sendEventSourceDevRequest } =
    useSSE({
      onTranscription,
      onMessage: onTranscription,
      onComplete: onClose,
      onClose: onClose,
    });

  const scrollviewRef = useRef<ScrollView>(null);

  const startES = () => {
    setLoading(true);
    sendEventSourceDevRequest(SSE_RES_4_TESTING_WITH_CARDS);
  };

  const endES = () => {
    terminateEventSourceConnection();
  };

  return (
    <ScrollView
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
            <ButtonAllinOne onPress={endES} variant="outline">
              <Text>结束测试</Text>
            </ButtonAllinOne>
          </View>
          <View
            className="flex-1 gap-3 bg-white px-4"
            style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 }}>
            <Text className="text-lg font-medium">{'SSE测试'}</Text>
            {
              // 对转录数据进行遍历
              transcription.map((item) => (
                <HighlightableParagraph
                  type={item.type}
                  key={`paragraph-${item.id}`}
                  sentence={item.data}
                />
              ))
            }
          </View>
        </TintedBackground>
      </View>

      <BottomIndicator />
    </ScrollView>
  );
};

interface HighlightableParagraphProps {
  sentence: SentenceProps;
  type: 'enhanced' | 'raw';
}

const HighlightableParagraph = ({ sentence, type }: HighlightableParagraphProps) => {
  const [isActive, setIsActive] = useState(false);

  const textDecorationStyles: TextStyle = {
    textDecorationLine: 'underline',
    textDecorationColor: '#FFD84E',
  };

  const hasTerms = sentence?.card && JSON.parse(sentence.card)['terms'].length;
  // 如果是未增强过的转录数据，或增强过的转录数据中知识卡片数组为空，就直接将原句返回
  if (type === 'raw' || !hasTerms) {
    return (
      <Text
        onPressOut={() => setIsActive(false)}
        style={[{ lineHeight: 26 }, isActive && textDecorationStyles]}
        onLongPress={() => setIsActive(true)}>
        <Text>{sentence.text}</Text>;
      </Text>
    );
  }

  // 如果调用了该函数，则代表句子中一定有知识卡片，需要进行分割
  const segmentedSentence = segmentSentence(sentence);

  return (
    <Text
      onPressOut={() => setIsActive(false)}
      style={[{ lineHeight: 26 }, isActive && textDecorationStyles]}
      onLongPress={() => setIsActive(true)}>
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
      const segmentId = `sentence-${sentence.id}-segment-${index}-plain-${plainTextStartIndex}`;
      segments.push({
        text: plainText,
        isTerm: false,
        segmentId,
      });
    }

    // 2. 再将当前遍历到的知识卡片push到切片数组中
    const segmentId = `sentence-${sentence.id}-segment-${index}-term`;
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
    const segmentId = `sentence-${sentence.id}-segment-last-text`;
    segments.push({
      text: remainingText,
      isTerm: false,
      segmentId,
    });
  }

  return segments;
};

export default RealtimeTranscribe;
