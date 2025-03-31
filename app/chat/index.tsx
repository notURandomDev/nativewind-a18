import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { clearChat, loadChat, saveChat } from 'storage/fakeDatabase';
import * as Progress from 'react-native-progress';
import EventSource, { EventSourceEvent, EventSourceListener } from 'react-native-sse';
import { MyCustomEvents } from 'utils/eventSourceTypes';
import { MeetingRefCard } from 'components/ReferenceCards';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import {
  AgentResponseProps,
  LocalChatMessageProps,
  LocalMeetingRefMessageProps,
} from './messageTypes';
import { MessageBubble } from './MessageBubble';
import BottomToolBox from './BottomToolBox';
import { TEST_DATA_REFERENCE, TEST_DATA_ANSWER } from './data';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSSE } from 'hooks/useSSE';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

enum SenderType {
  USER = 0,
  AI = 1,
}

const URL_4_REAL = `http://192.168.125.53:8088/Chat`;

const Modal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [linked, setLinked] = useState(false);

  const [textInputValue, setTextInputValue] = useState('');

  const [messages, setMessages] = useState<
    Array<LocalChatMessageProps | LocalMeetingRefMessageProps>
  >([]);
  const [replyMessage, setReplyMessage] = useState('');

  const onChatnMessage = (event: { data: string | null }) => {
    console.log('raw event', event);
    if (event.data !== null) {
      const res = JSON.parse(event.data) as AgentResponseProps;
      console.log('message received from sse', res);

      if (res.type === 'answer') {
        setReplyMessage((prev) => prev + res.data.text);
      }

      if (res.type === 'reference' && res.data.reference) {
        const referenceResponse: LocalMeetingRefMessageProps[] = res.data.reference.map((ref) => {
          console.log('ref here', ref);
          return {
            type: 'reference',
            id: Date.now() + parseInt(ref.meetingId),
            reference: ref,
          };
        });

        referenceRef.current = [...referenceRef.current, ...referenceResponse];
      }
    }
  };
  const onCompletenClose = () => {
    console.log('Event Source Closed');
    saveSSEResponse();
    setLinked(false);
  };
  const { sendEventSourceDevRequest, sendEventSourcePostRequest, terminateEventSourceConnection } =
    useSSE({
      onChat: onChatnMessage,
      onMessage: onChatnMessage,
      onComplete: onCompletenClose,
      onClose: onCompletenClose,
      onOpen: () => {
        console.log('Event Source Opened');
        setLinked(true);
      },
    });

  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const replyMessageRef = useRef('');
  const referenceRef = useRef<LocalMeetingRefMessageProps[]>([]);
  const messagesRef = useRef<Array<LocalChatMessageProps | LocalMeetingRefMessageProps>>(messages);

  const esRef = useRef<EventSource<MyCustomEvents> | null>(null);

  const backToBottomOpacity = useSharedValue(100);
  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(backToBottomOpacity.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.cubic),
    }),
  }));

  const initKbdCfg = () => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 10);
    });
  };

  const showKeyboard = () => {
    textInputRef.current?.focus();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const scrollToEnd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scrollViewRef.current?.scrollToEnd();
  };

  const initChat = async () => {
    const chatData = await loadChat(1);
    setMessages([...chatData]);
  };

  const saveSSEResponse = () => {
    // 保存响应的文本数据
    const answerResponse: LocalChatMessageProps = {
      type: 'chat',
      id: Date.now(),
      text: replyMessageRef.current,
      sender: SenderType.AI,
    };
    setMessages((prevMsgs) => {
      return [...prevMsgs, answerResponse];
    });
    replyMessageRef.current = '';

    // 如果有reference数据，在保存完聊天数据之后将其进行保存
    if (referenceRef.current) {
      setMessages((prevMsgs) => {
        return [...prevMsgs, ...referenceRef.current];
      });
    }

    setIsLoading(false);
  };

  const saveChatAsync = async () => {
    await saveChat(1, messagesRef.current);
  };

  const clearChatAsync = async () => {
    clearChat();
    setMessages([]);
    messagesRef.current = [];
  };

  useEffect(() => {
    console.log('---modal mounted---');
    initChat();
    initKbdCfg();

    return () => {
      terminateEventSourceConnection();
      saveChatAsync();
      console.log('unmounted');
    };
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
    referenceRef.current = [];
  }, [messages]);

  useEffect(() => {
    replyMessageRef.current = replyMessage;
  }, [replyMessage]);

  const handleSubmit = async (textinput: string) => {
    setReplyMessage('');
    setIsLoading(true);
    setTextInputValue(textinput);

    const newMessage: LocalChatMessageProps = {
      id: Date.now(),
      text: textinput,
      sender: SenderType.USER,
      type: 'chat',
    };
    Keyboard.dismiss();

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...newMessage, text: newMessage.text || '' },
    ]);
    sendEventSourceDevRequest(TEST_DATA_ANSWER);
    // sendSSERequest();
    setTextInputValue('');
  };

  const MemorizedMessages = useMemo(() => {
    return messages.map((message) => {
      if (message.type === 'chat') {
        const { text, id, sender } = message as LocalChatMessageProps;
        if (text.length)
          return (
            <MessageBubble type="chat" id={id} key={`message-${id}`} text={text} sender={sender} />
          );
      }
      if (message.type === 'reference') {
        const { reference, id } = message as LocalMeetingRefMessageProps;
        return (
          <MeetingRefCard
            key={`ref-meeting-${id}`}
            imgSource={require('../../assets/imgs/carousel-bg.png')}
            {...reference}
          />
        );
      }
    });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={25}
      className="flex-1"
      behavior="padding"
      style={{ backgroundColor: '#ffffff', marginBottom: 0 }}>
      <View className="relative flex-1">
        <LinearGradient
          colors={['#ffffff', '#ffffff', '#ffffff00']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0, 0.3, 1]}
          style={{
            position: 'absolute',
            height: 30,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          }}
        />
        <View className="absolute" style={{ bottom: 32, right: 20, zIndex: 10 }}>
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity
              onPress={scrollToEnd}
              activeOpacity={1}
              className="rounded-full border border-gray bg-white p-2">
              <Ionicons size={20} name="arrow-down-outline" />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <ScrollView
          onScroll={(e) => {
            if (
              e.nativeEvent.contentSize.height - e.nativeEvent.contentOffset.y >= 700 &&
              backToBottomOpacity.value === 0
            ) {
              backToBottomOpacity.value = 100;
            }
            // 接近底部
            if (
              backToBottomOpacity.value === 100 &&
              e.nativeEvent.contentSize.height - e.nativeEvent.contentOffset.y < 700
            ) {
              backToBottomOpacity.value = 0;
            }
          }}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
          ref={scrollViewRef}
          contentContainerStyle={{ gap: 20, paddingBottom: 30 }}
          contentContainerClassName="p-4"
          style={{ backgroundColor: '#ffffff' }}>
          {MemorizedMessages}
          {isLoading &&
            (replyMessage === '' ? (
              <View className="" style={{ paddingHorizontal: 18 }}>
                <Progress.CircleSnail
                  size={36}
                  duration={1000}
                  spinDuration={1000}
                  style={{ alignSelf: 'flex-start' }}
                />
              </View>
            ) : (
              <MessageBubble
                type="chat"
                id={Date.now()}
                text={replyMessage}
                sender={SenderType.AI}
              />
            ))}
        </ScrollView>
      </View>

      {/* Bottom Toolbar */}
      <BottomToolBox
        sseLinkState={linked}
        onDeleteChat={clearChatAsync}
        onDisconnectSSE={terminateEventSourceConnection}
        textInputRef={textInputRef}
        onSubmit={handleSubmit}
        onKeyboardToggle={keyboardVisible ? dismissKeyboard : showKeyboard}
      />
    </KeyboardAvoidingView>
  );
};

export default Modal;
