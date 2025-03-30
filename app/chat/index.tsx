import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';

import { clearChat, loadChat, saveChat } from 'storage/fakeDatabase';
import MyTextInput from 'components/MyTextInput';
import { getSign } from 'utils/getSign';
import * as Progress from 'react-native-progress';
import Markdown from 'react-native-markdown-display';
import EventSource, { EventSourceListener } from 'react-native-sse';
import { MyCustomEvents } from 'utils/eventSourceTypes';
import { MeetingRefCard } from 'components/ReferenceCards';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

interface Reference4MeetingProps {
  meetingId: string;
  title: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface Reference4TranscriptionProps {
  sentenceId: number;
  startTime: number;
  endTime: number;
  text: string;
}

interface AgentResponseDataProps {
  text?: string;
  message_id: string;
  timestamp: number;
  reference?: Array<Reference4MeetingProps>;
}
interface AgentResponseProps {
  type: 'answer' | 'reference';
  data: AgentResponseDataProps;
  timestamp: number;
  _final: boolean;
}

interface TestResponseProps {
  testing: boolean;
  sse_dev: string;
  msg: string;
  now: number;
}

interface LocalMessageProps {
  id?: number;
  text: string;
  sender: number;
}

const USER = 0;
const AI = 1;

const TEST_DATA: AgentResponseProps = {
  type: 'reference',
  timestamp: 1743174269356,
  _final: false,
  data: {
    message_id: '7634640000004581',
    timestamp: 0,
    reference: [
      {
        meetingId: '2',
        title: '人工智能与安全分论坛',
        location: '杭州国际博览中心-202B',
        description: '探讨人工智能在安全领域的应用与挑战',
        startTime: '2025-04-15T13:00:00',
        endTime: '2025-04-15T16:00:00',
      },
      {
        meetingId: '5',
        title: '技术展示与演示',
        location: '杭州国际博览中心-505E',
        description: '展示最新的数字安全技术与产品',
        startTime: '2025-04-15T14:00:00',
        endTime: '2025-04-15T17:00:00',
      },
    ],
  },
};
const queryString = new URLSearchParams({
  jsonobj: JSON.stringify(TEST_DATA),
}).toString();

const URL_4_TEST = `https://sse.dev/test?${queryString}`;
const URL_4_REAL = `http://192.168.125.53:8088/Chat`;

const MessageBubble = ({ text, sender }: LocalMessageProps) => (
  <View className={`${sender === USER && 'justify-end'} flex-row `}>
    <View
      style={{
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: sender === USER ? 12 : 0,
        borderBottomRightRadius: sender === USER ? 0 : 12,
        paddingHorizontal: 16,
        paddingVertical: 0,
      }}
      className={sender === USER ? 'flex-col-reverse bg-blue' : 'bg-blue-faint'}>
      <Markdown
        style={{
          body: {
            flex: 1,
            fontSize: 20,
            lineHeight: 32,
            color: sender === USER ? '#ffffff' : '#000000',
            fontWeight: sender === USER ? 300 : 400,
          },
          list_item: { marginBottom: 8 },
        }}>
        {text}
      </Markdown>
    </View>
  </View>
);

const Modal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<LocalMessageProps>>([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const textInputRef = useRef<TextInput>(null);
  const replyMessageRef = useRef('');
  const referenceRef = useRef<Reference4MeetingProps[]>([]);
  const messagesRef = useRef<Array<LocalMessageProps>>(messages);
  const scrollViewRef = useRef<ScrollView>(null);
  const wsRef = useRef<WebSocket | null>(null);
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
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 10);
    });

    setTimeout(() => {
      if (textInputRef?.current) textInputRef.current.focus();
    }, 100);
  };

  const initChat = async () => {
    const chatData = await loadChat(1);
    setMessages([...chatData]);
  };

  const initWebSocket = () => {
    const sign = getSign(appKey, appSecret);
    const ws = new WebSocket(`https://www.das-ai.com/open/ws/chat?appKey=${appKey}&sign=${sign}`);
    wsRef.current = ws;

    ws.onopen = (e) => {
      console.log('onopen', e);
    };

    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);
      // console.log(res.answer);

      if (res.status === 0) {
        setMessages((prevMsgs) => {
          const newMsg = { id: Date.now(), text: res.answer, sender: AI };
          return [...prevMsgs, newMsg];
        });
        setIsLoading(false);
      }
      // scrollViewRef.current?.scrollToEnd();
      setReplyMessage(res.answer);
    };

    ws.onerror = (e) => {
      console.log('onerror', e);
    };

    ws.onclose = (e) => {
      console.log('onclose', e);
    };

    return ws;
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

  const handleSubmit = async () => {
    setReplyMessage('');
    setIsLoading(true);

    const newMessage = {
      id: Date.now(),
      text: textInputValue,
      sender: USER,
    };
    Keyboard.dismiss();

    setMessages((prevMessages) => [...prevMessages, newMessage]);
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
      keyboardVerticalOffset={20}
      className="flex-1"
      behavior="padding"
      style={{ backgroundColor: '#ffffff', marginBottom: 55 }}>
      <ScrollView
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
        ref={scrollViewRef}
        contentContainerClassName="gap-4 p-4 justify-end"
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: '#ffffff' }}>
        {MemorizedMessages}
        {TEST_DATA.data.reference &&
          TEST_DATA.data.reference.map((item) => (
            <MeetingRefCard imgSource={require('../../assets/imgs/carousel-bg.png')} {...item} />
          ))}

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

      {/* Bottom Toolbar */}
      <View className="gap-3 p-4" style={{ paddingBottom: 50 }}>
        <MyTextInput
          ref={textInputRef}
          onChangeText={setTextInputValue}
          value={textInputValue}
          placeholder="有问题尽管问安小恒！"
        />
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-5">
            <Feather name="edit-3" size={24} color="#1556F0" />
            <Feather name="camera" size={24} color="#1556F0" />
            <Feather name="image" size={24} color="#1556F0" />
            <Feather name="file-plus" size={24} color="#1556F0" />
          </View>
          <View className="flex-row gap-2">
            <ButtonAllinOne onPress={clearChatAsync} label="清空对话" variant="outline" />
            <ButtonAllinOne onPress={terminateEventSource} label="断开SSE" variant="outline" />
            <TouchableOpacity
              onPress={textInputValue ? handleSubmit : () => {}}
              className={`${isLoading || !textInputValue.length ? 'bg-blue-faint' : 'bg-blue'} rounded-full`}
              style={{ padding: 8 }}>
              <Ionicons size={16} color="#ffffff" name="paper-plane-outline" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Modal;
