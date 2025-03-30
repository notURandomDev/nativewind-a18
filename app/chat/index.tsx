import { View, Keyboard, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { clearChat, loadChat, saveChat } from 'storage/fakeDatabase';
import { getSign } from 'utils/getSign';
import * as Progress from 'react-native-progress';
import EventSource, { EventSourceListener } from 'react-native-sse';
import { MyCustomEvents } from 'utils/eventSourceTypes';
import { MeetingRefCard, TranscriptionRefCard } from 'components/ReferenceCards';

import { AgentResponseProps, LocalMessageProps, Reference4MeetingProps } from './types';
import { MessageBubble } from './MessageBubble';
import BottomToolBox from './BottomToolBox';
import { TEST_DATA } from './data';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

const USER = 0;
const AI = 1;

const queryString = new URLSearchParams({
  jsonobj: JSON.stringify(TEST_DATA),
}).toString();

const URL_4_TEST = `https://sse.dev/test?${queryString}`;
const URL_4_REAL = `http://192.168.125.53:8088/Chat`;

const Modal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [textInputValue, setTextInputValue] = useState('');

  const [messages, setMessages] = useState<Array<LocalMessageProps>>([]);
  const [replyMessage, setReplyMessage] = useState('');

  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const replyMessageRef = useRef('');
  const referenceRef = useRef<Reference4MeetingProps[]>([]);
  const messagesRef = useRef<Array<LocalMessageProps>>(messages);

  const esRef = useRef<EventSource<MyCustomEvents> | null>(null);

  const esListener: EventSourceListener<MyCustomEvents> = (event) => {
    if (event.type === 'open') {
      console.log('Event Source Opened');
    } else if (event.type === 'chat' || event.type === 'message') {
      console.log('raw event', event);
      if (event.data) {
        const res = JSON.parse(event.data) as AgentResponseProps;
        console.log('message received from sse', res);
        if (res.type === 'answer') {
          setReplyMessage((prev) => prev + res.data.text);
        }
        if (res.type === 'reference') {
          referenceRef.current = [
            ...referenceRef.current,
            ...(res.data.reference as Reference4MeetingProps[]),
          ];
        }
      }
    } else if (event.type === 'complete' || event.type === 'close') {
      console.log('Event Source Closed');
      saveSSEResponse();
    }
  };

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
  const initChat = async () => {
    const chatData = await loadChat(1);
    setMessages([...chatData]);
  };

  const initEventSource = () => {
    if (esRef.current) {
      esRef.current.addEventListener('message', esListener);
      esRef.current.addEventListener('open', esListener);
      esRef.current.addEventListener('chat', esListener);
      esRef.current.addEventListener('complete', esListener);
      esRef.current.addEventListener('close', esListener);
    }
  };

  const sendTestSSERequest = () => {
    const es = new EventSource(URL_4_TEST);
    esRef.current = es;
    initEventSource();
  };

  const sendSSERequest = () => {
    const req = JSON.stringify({
      input: textInputValue,
      isInMeeting: false,
    });
    console.log('Request Body:', req);
    const es = new EventSource(URL_4_TEST, {
      method: 'POST',
      body: req,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    esRef.current = es;
    initEventSource();
  };

  const saveSSEResponse = () => {
    console.log('sync-replyMessage before saving:', replyMessageRef.current);
    const sseResponse = { id: Date.now(), text: replyMessageRef.current, sender: AI };
    setMessages((prevMsgs) => {
      return [...prevMsgs, sseResponse];
    });
    console.log('referenceRef current data', referenceRef.current);
    setIsLoading(false);
  };

  const terminateEventSource = () => {
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
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
    // initWebSocket();

    return () => {
      terminateEventSource();
      saveChatAsync();
      // wsRef.current && wsRef.current.close();
      console.log('unmounted');
    };
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    replyMessageRef.current = replyMessage;
  }, [replyMessage]);

  const handleSubmit = async (textinput: string) => {
    setReplyMessage('');
    setIsLoading(true);
    setTextInputValue(textinput);

    const newMessage = {
      id: Date.now(),
      text: textinput,
      sender: USER,
    };
    Keyboard.dismiss();

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...newMessage, text: newMessage.text || '' },
    ]);
    sendTestSSERequest();
    // sendSSERequest();
    setTextInputValue('');
  };

  const MemorizedMessages = useMemo(() => {
    return messages.map(({ text, sender, id }: LocalMessageProps) => (
      <MessageBubble id={id} key={`message-${id}`} text={text} sender={sender} />
    ));
  }, [messages]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={25}
      className="flex-1"
      behavior="padding"
      style={{ backgroundColor: '#ffffff', marginBottom: 55 }}>
      <View className="flex-1">
        <ScrollView
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
          ref={scrollViewRef}
          contentContainerClassName="gap-4 p-4"
          style={{ backgroundColor: '#ffffff' }}>
          {MemorizedMessages}
          {TEST_DATA.data.reference &&
            TEST_DATA.data.reference.map((item) => (
              <MeetingRefCard imgSource={require('../../assets/imgs/carousel-bg.png')} {...item} />
            ))}
          <TranscriptionRefCard
            imgSource={require('../../assets/imgs/carousel-bg.png')}
            {...{
              sentenceId: 44,
              startTime: 745380,
              endTime: 761310,
              text: '到了我这一块，我将简短明了地分享汇报内容，不占用大家的午休时间。我的汇报主题是面向大模型训练和推理的数据保护机密计算产品。',
            }}
          />

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
              <MessageBubble text={replyMessage} sender={AI} />
            ))}
        </ScrollView>
      </View>

      {/* Bottom Toolbar */}
      <BottomToolBox
        textInputRef={textInputRef}
        onSubmit={handleSubmit}
        onKeyboardToggle={keyboardVisible ? dismissKeyboard : showKeyboard}
      />
    </KeyboardAvoidingView>
  );
};

export default Modal;
