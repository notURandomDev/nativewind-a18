import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { livechatMockData } from 'data/chat';
import MyTextInput from 'components/MyTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import MessageItem from './components/MessageItem';
import { INIT_MSG, MOCK_LIVE_CHAT, SELF_MSG } from './constants';
import BackToEndBtn from './components/BackToEndBtn';
import { debounce, throttle } from 'lodash';

const ChatTab = () => {
  const [msgs, setMsgs] = useState([INIT_MSG]);
  const [input, setInput] = useState('');
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [dragging, setDragging] = useState(false);

  const count = useRef(0);
  const scrollviewRef = useRef<ScrollView>(null);
  const inputRef = useRef('');

  const scrollToEnd = () => scrollviewRef.current?.scrollToEnd();
  const handleSubmit = useCallback(
    throttle(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setMsgs((prev) => [...prev, { msg: inputRef.current, id: Date.now(), ...SELF_MSG }]);
      Keyboard.dismiss();
      setInput('');
    }, 3000),
    []
  );
  const handleBackToEnd = () => {
    scrollToEnd();
    setAutoScrollEnabled(true);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      scrollToEnd();
    });

    /*  const intervalId = setInterval(() => {
      setTimeout(
        () =>
          setMsgs((prev) => [
            ...prev,
            {
              id: Date.now(),
              ...MOCK_LIVE_CHAT[count.current++ % 50],
            },
          ]),
        Math.floor((3000 * Math.random()) % 1000)
      );
    }, 2000); */

    return () => {
      // clearInterval(intervalId);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="relative flex-1 bg-white"
      keyboardVerticalOffset={390}
      style={{ marginBottom: 190 }}>
      <ScrollView
        scrollEventThrottle={100}
        onScroll={({
          nativeEvent: { zoomScale, layoutMeasurement, contentInset, target, ...rest },
        }) => {
          const offsetY = rest.contentOffset.y;
          const height = rest.contentSize.height;
          const diff = height - offsetY;
          if (!autoScrollEnabled && diff < 500 && !dragging) setAutoScrollEnabled(true);
        }}
        onScrollBeginDrag={() => {
          setAutoScrollEnabled(false);
          if (!dragging) setDragging(true);
        }}
        onScrollEndDrag={() => {
          setDragging(false);
        }}
        onContentSizeChange={() => {
          if (autoScrollEnabled) {
            scrollToEnd();
          } else {
            scrollviewRef.current?.flashScrollIndicators();
          }
        }}
        ref={scrollviewRef}
        style={{ paddingHorizontal: 24 }}
        className="flex-1"
        contentContainerClassName="gap-5 py-4">
        {msgs.map(({ id, ...msg }) => (
          <MessageItem {...msg} key={`live-chat-msg-${id}`} />
        ))}
      </ScrollView>
      <BackToEndBtn onPress={handleBackToEnd} show={!autoScrollEnabled} />

      <View
        className="flex-row items-center gap-4 border-gray px-6 py-4"
        style={{ paddingBottom: 20, borderTopWidth: 1 }}>
        <View className="flex-1">
          <MyTextInput
            value={input}
            onChangeText={(text) => {
              setInput(text);
              inputRef.current = text;
            }}
            size="sm"
            searchInput={false}
            placeholder="发送友好的评论吧！"
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          className="rounded-full bg-blue"
          style={{ padding: 8 }}
          activeOpacity={1}>
          <Ionicons color="#ffffff" size={20} name="paper-plane-outline" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatTab;
