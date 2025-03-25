import { View, Text, ScrollView, Alert, StyleProp, TextStyle } from 'react-native';
import React, { Children, ReactNode, useEffect, useRef, useState } from 'react';
import TintedBackground from 'components/TintedBackground';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { getSign } from 'utils/getSign';
import BottomIndicator from 'components/BottomIndicator';
// const sseTestURL = ' https://sse.dev/test';
//const sseTestURL = 'http://127.0.0.1:4523/m1/5093783-4756245-default/ssetest';
// const sseTestURL = '10.249.1.135:3000/events';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

import TRANSCRIPTION_DATA from '../../../../test/enhance_output_cards.json';
TRANSCRIPTION_DATA.sort((a, b) => a.sentenceId - b.sentenceId);

interface KnowledgeDataProps {
  term: string;
  explanation: string;
  positions: Array<Array<number>>;
}

interface TranscriptionProps {
  type: string;
  data: {
    sentence_id: number; // uuid
    speaker_id: number; // 发言者ID
    seq_num: string; // 句子顺序
    text: string; // 转写文本
    knowledge_data: {
      terms: Array<KnowledgeDataProps>;
    };
    start_time: string; // 语句开始时间
    end_time: string; // 语句结束时间
    is_final: boolean; // false表示临时结果，true表示最终转写
    is_enhanced: boolean; // 数据是否经过增强处理
  };
}

const RealtimeTranscribe = () => {
  const [transcription, setTranscription] = useState<Array<SentenceProps>>(TRANSCRIPTION_DATA);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const scrollviewRef = useRef<ScrollView>(null);

  const startTest = () => {
    setLoading(true);
    setTranscription([]);
    wsRef.current &&
      wsRef.current.send(
        JSON.stringify({
          query: '请你详细介绍一下安恒',
        })
      );
  };
  const endTest = () => {
    wsRef.current && wsRef.current.close();
  };

  useEffect(() => {
    const sign = getSign(appKey, appSecret);
    const ws = new WebSocket(`https://www.das-ai.com/open/ws/chat?appKey=${appKey}&sign=${sign}`);
    wsRef.current = ws;

    ws.onopen = (e) => {
      console.log('onopen', e);
    };

    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);

      if (res.status === 0) {
        setLoading(false);
        return;
      }

      // setTranscription(res.answer);
    };

    ws.onerror = (e) => {
      console.log('onerror', e);
    };

    ws.onclose = (e) => {
      console.log('onclose', e);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {}, []);

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
        // paddingBottom: 245,
        paddingBottom: 285,
      }}>
      <View className="gap-4">
        <TintedBackground label="实时转写">
          <View className="flex-row justify-between">
            <ButtonAllinOne disabled={loading} onPress={startTest}>
              <Text className="text-white">开始测试</Text>
            </ButtonAllinOne>
            <ButtonAllinOne onPress={endTest} variant="outline">
              <Text>结束测试</Text>
            </ButtonAllinOne>
          </View>
          <View
            className="flex-1 gap-3 bg-white px-4"
            style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 }}>
            <Text className="text-lg font-medium">{'SSE测试'}</Text>
            {transcription.map((sentence) => (
              <HighlightableParagraph
                key={`paragraph-${sentence.sentenceId}`}
                sentence={sentence}
              />
            ))}
          </View>
        </TintedBackground>
      </View>
      <BottomIndicator />
    </ScrollView>
  );
};

const HighlightableParagraph = ({ sentence }: { sentence: SentenceProps }) => {
  const [isActive, setIsActive] = useState(false);

  const segmentedSentence = segmentSentence(sentence);
  const textDecorationStyles: TextStyle = {
    textDecorationLine: 'underline',
    textDecorationColor: '#FFD84E',
  };
  return (
    <Text
      onPressOut={() => setIsActive(false)}
      style={[{ lineHeight: 26 }, isActive && textDecorationStyles]}
      onLongPress={() => setIsActive(true)}>
      {segmentedSentence.map((segment) => {
        if (segment.isTerm) {
          return (
            <Text
              key={segment.segmentId}
              suppressHighlighting={true}
              onPress={() => Alert.alert(segment.text, segment.explanation)}
              className="text-blue">
              {segment.text}
            </Text>
          );
        } else {
          return <Text>{segment.text}</Text>;
        }
      })}
    </Text>
  );
};

interface SentenceProps {
  sentenceId: number;
  text: string;
  startTime: number;
  endTime: number;
  card: string;
}

interface SentenceSegmentProps {
  segmentId: string;
  text: string;
  isTerm: boolean;
  explanation?: string;
}

const segmentSentence = (sentence: SentenceProps) => {
  const segments: Array<SentenceSegmentProps> = [];

  const terms: Array<KnowledgeDataProps> = JSON.parse(sentence.card).terms;

  // 如果card是一个空数组，就不用进行分割，直接返回原始句子
  if (!terms.length) {
    return [
      { text: sentence.text, isTerm: false, segmentId: `sentence-${sentence.sentenceId}-no-card` },
    ];
  }

  let plainTextStartIndex = 0;

  terms.forEach((term: KnowledgeDataProps, index) => {
    const [termTextStartIndex, termTextEndIndex] = term.positions[0];

    // 如果两个term是连在一起的，就不用对plainText进行切割
    if (plainTextStartIndex !== termTextStartIndex) {
      const plainText = sentence.text.slice(plainTextStartIndex, termTextStartIndex);
      segments.push({
        text: plainText,
        isTerm: false,
        segmentId: `sentence-${sentence.sentenceId}-segment-${index}-plain`,
      });
    }

    segments.push({
      text: term.term,
      isTerm: true,
      explanation: term.explanation,
      segmentId: `sentence-${sentence.sentenceId}-segment-${index}-term`,
    });
    plainTextStartIndex = termTextEndIndex + 1;
  });

  if (plainTextStartIndex < sentence.text.length) {
    const remainingText = sentence.text.slice(plainTextStartIndex);
    segments.push({
      text: remainingText,
      isTerm: false,
      segmentId: `sentence-${sentence.sentenceId}-segment-last-text`,
    });
  }

  return segments;
};

export default RealtimeTranscribe;
