import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import TintedBackground from 'components/TintedBackground';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { getSign } from 'utils/getSign';
import BottomIndicator from 'components/BottomIndicator';
// const sseTestURL = ' https://sse.dev/test';
//const sseTestURL = 'http://127.0.0.1:4523/m1/5093783-4756245-default/ssetest';
// const sseTestURL = '10.249.1.135:3000/events';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

import TC_DATA from './output.json';
TC_DATA.sort((a, b) => a.sentenceId - b.sentenceId);
console.log(TC_DATA);

const TC_EXAMPLE = {
  type: 'realtime',
  data: {
    sentence_id: 'sdf',
    speaker_id: 2, // 发言者ID
    seq_num: '0', // 句子顺序
    text: '过去的十多年时间，一直带领安全团队冲在安全攻防第一线。\n最近5年转向产业研究，AI+网络安全是我们持续研究的核心课题。', // 转写文本
    knowledge_data: {
      terms: [
        {
          term: '安全攻防',
          explanation: '网络安全领域的对抗技术体系，涵盖攻击模拟、漏洞防御、入侵检测等实战能力',
          positions: [[76, 101]],
        },
        {
          term: 'AI+网络安全',
          explanation:
            '将机器学习、深度学习等人工智能技术应用于威胁检测、风险预测、自动化响应等网络安全场景的技术融合方向',
          positions: [[148, 164]],
        },
      ],
    },
    start_time: '590', // 语句开始时间
    end_time: '11200', // 语句结束时间
    is_final: true, // false表示临时结果，true表示最终转写
    is_enhanced: true, // 数据是否经过增强处理
  },
};

interface KnowledgeDataProps {
  term: string;
  explanation: string;
  positions: Array<Array<number>>;
}

interface TcTextProps {
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

interface PureTranscriptionProps {
  sentenceId: number;
  text: string;
  startTime: number;
  endTime: number;
}

const RealtimeTranscribe = () => {
  const [tcText, setTcText] = useState<Array<PureTranscriptionProps>>(TC_DATA);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const scrollviewRef = useRef<ScrollView>(null);

  const startTest = () => {
    setLoading(true);
    setTcText([]);
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

      // setTcText(res.answer);
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
            {tcText.map((item) => {
              return (
                <Text
                  key={`sentence-${item.sentenceId}`}
                  style={{ lineHeight: 26 }}
                  className="font-light text-gray-text">
                  {item.text}
                </Text>
              );
            })}
          </View>
        </TintedBackground>
      </View>
      <BottomIndicator />
    </ScrollView>
  );
};

export default RealtimeTranscribe;
