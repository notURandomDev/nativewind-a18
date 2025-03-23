import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import TintedBackground from 'components/TintedBackground';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { getSign } from 'utils/getSign';
// const sseTestURL = ' https://sse.dev/test';
//const sseTestURL = 'http://127.0.0.1:4523/m1/5093783-4756245-default/ssetest';
// const sseTestURL = '10.249.1.135:3000/events';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

const RealtimeTranscribe = () => {
  const startTest = () => {
    wsRef.current &&
      wsRef.current.send(
        JSON.stringify({
          query: '你好吗',
        })
      );
  };
  const endTest = () => {
    wsRef.current && wsRef.current.close();
  };

  const [tcText, setTcText] = useState('');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const sign = getSign(appKey, appSecret);
    const ws = new WebSocket(`https://www.das-ai.com/open/ws/chat?appKey=${appKey}&sign=${sign}`);
    wsRef.current = ws;

    ws.onopen = (e) => {
      console.log('onopen', e);
    };

    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);
      setTcText(res.answer);
    };

    ws.onerror = (e) => {
      console.log('onerror', e);
    };

    ws.onclose = (e) => {
      console.log('onclose', e);
    };
  }, []);

  return (
    <View className="gap-4">
      <TintedBackground label="实时转写">
        <View className="flex-row justify-between">
          <ButtonAllinOne onPress={startTest}>
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
          <Text style={{ lineHeight: 26 }} className="font-light text-gray-text">
            {tcText}
          </Text>
        </View>
      </TintedBackground>
      <View>
        <Text>asdf</Text>
      </View>
    </View>
  );
};

export default RealtimeTranscribe;
