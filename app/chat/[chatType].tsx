import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { clearChat, loadChat, saveChat } from 'storage/chatStorage';
import { EventSourceEvent, EventSourceListener } from 'react-native-sse';
import { MeetingRefCard, TranscriptionRefCard } from 'components/ReferenceCards';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';

import {
  AgentResponseProps,
  LocalChatMessageProps,
  LocalMeetingRefMessageProps,
  LocalTranscriptionRefMessageProps,
  Reference4MeetingProps,
  Reference4TranscriptionProps,
} from './messageTypes';
import { MessageBubble } from './MessageBubble';
import BottomToolBox from './BottomToolBox';
import {
  TEST_DATA_REF_MEETING,
  TEST_DATA_ANSWER,
  TEST_DATA_REF_TRANSCRIPTION,
  TEST_DATA_PHASE,
  TRANSCRIPTION_THUMBNAILS,
} from './data';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MyCustomEvents, useSSE } from 'hooks/useSSE';
import { useLocalSearchParams } from 'expo-router';
import PhaseIndicator, { PhaseCodeTypes } from 'components/PhaseIndicator';
import PhaseSection from 'components/PhaseSection';

const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;

enum SenderType {
  USER = 0,
  AI = 1,
}

type ChatTypes = 'insideMeeting' | 'outsideMeeting';

const URL_4_REAL = 'http://192.168.184.53:8088/Chat';
const URL_4_SIMULATE = 'http://192.168.184.53:8088/chatSimulate';

const Modal = () => {
  const { chatType }: { chatType: ChatTypes } = useLocalSearchParams();
  console.log('chat-type', chatType);

  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [linked, setLinked] = useState(false);

  const [messages, setMessages] = useState<
    Array<LocalChatMessageProps | LocalMeetingRefMessageProps | LocalTranscriptionRefMessageProps>
  >([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [completedPhases, setCompletedPhases] = useState<PhaseCodeTypes[]>([]);
  const [currentPhase, setCurrentPhase] = useState<{
    completed: boolean;
    phaseCode: PhaseCodeTypes;
  } | null>(null);

  const replyMessageRef = useRef('');

  /* useEffect(() => {
    console.log('useEffect-replyMessage-changed', replyMessage);
  }, [replyMessage]); */

  const onChatnMessage = (event: EventSourceEvent<MyCustomEvents>) => {
    // console.log('raw event', event);
    if (event.data !== null) {
      const res = JSON.parse(event.data) as AgentResponseProps;
      console.log('message received from sse', res);
      if (res.type === 'stage') {
        if (currentPhase) {
          const prevPhase = currentPhase;
          setCompletedPhases((prev) => [...prev, prevPhase.phaseCode]);
          setTimeout(() => {
            setCurrentPhase({ completed: false, phaseCode: res.data.phaseCode || -1 });
          }, 0);
        } else {
          setCurrentPhase({ completed: false, phaseCode: res.data.phaseCode || -1 });
        }
      } else if (res.type === 'answer') {
        console.log('here');
        replyMessageRef.current += res.data.text;
        setReplyMessage((prev) => prev + res.data.text);
      } else if (res.type === 'reference') {
        // 没有reference数据，也会发一个reference类型的SSE消息
        if (!res.data.references) {
          saveSSEResponse();
          return;
        }

        const referenceResponse: Array<
          LocalMeetingRefMessageProps | LocalTranscriptionRefMessageProps
        > = res.data.references.map(
          (ref: Reference4TranscriptionProps | Reference4MeetingProps) => {
            console.log('ref here', ref);
            if (chatType === 'insideMeeting') {
              const { sentenceId } = ref as Reference4TranscriptionProps;
              return {
                type: 'ref-transcription',
                id: sentenceId,
                references: ref,
              };
            }

            if (chatType === 'outsideMeeting') {
              const { meetingId } = ref as Reference4MeetingProps;
              return {
                type: 'ref-meeting',
                id: Date.now() + parseInt(meetingId),
                references: ref,
              };
            }
          }
        );

        referenceRef.current = [...referenceRef.current, ...referenceResponse];
        saveSSEResponse();
      }
    }
  };
  const onCompletenClose = () => {
    console.log('Event Source Closed');
    terminateEventSourceConnection();
    setLinked(false);
    setCompletedPhases([]);
    saveSSEResponse();
  };
  const {
    sendEventSourceDevRequest,
    sendEventSourcePostRequest,
    sendEventSourceGetRequest,
    terminateEventSourceConnection,
  } = useSSE({
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
  const animationRef = useRef<LottieView>(null);

  const referenceRef = useRef<
    Array<LocalMeetingRefMessageProps | LocalTranscriptionRefMessageProps>
  >([]);
  const messagesRef =
    useRef<
      Array<LocalChatMessageProps | LocalMeetingRefMessageProps | LocalTranscriptionRefMessageProps>
    >(messages);

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
    console.log('reply message', replyMessage);
    const answerResponse: LocalChatMessageProps = {
      type: 'chat',
      id: Date.now(),
      text: replyMessageRef.current,
      // text: replyMessage,
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

  const phaseSectionOpacity = useSharedValue(0);
  const animatedPhaseStyles = useAnimatedStyle(() => {
    return { opacity: phaseSectionOpacity.value };
  });

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
    animationRef.current?.play();
    replyMessageRef.current = '';
    setReplyMessage('');
    setIsLoading(true);

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
    // sendEventSourceGetRequest(URL_4_SIMULATE);
    // sendEventSourceDevRequest(TEST_DATA_REF_TRANSCRIPTION);
    sendEventSourceDevRequest(TEST_DATA_REF_MEETING);
    // sendEventSourceDevRequest(TEST_DATA_ANSWER);
    /* sendEventSourcePostRequest(
      JSON.stringify({
        input: textinput,
        isInMeeting: chatType === 'insideMeeting' ? true : false,
      }),
      URL_4_REAL
    ); */

    // sendSSERequest();
  };

  const MemorizedMessages = useMemo(
    () =>
      messages.map((message, index, array) => {
        if (message.type === 'chat') {
          const { text, id, sender } = message as LocalChatMessageProps;
          if (text.trim().length)
            return (
              <MessageBubble
                type="chat"
                id={id}
                key={`message-${id}`}
                text={text}
                sender={sender}
              />
            );
        }

        const prevItem = array[index - 1];
        console.log('current item', message);

        if (message.type === 'ref-transcription' && chatType === 'insideMeeting') {
          const { references, id } = message as LocalTranscriptionRefMessageProps;
          const imgSource =
            TRANSCRIPTION_THUMBNAILS.get(id) ?? require('../../assets/imgs/carousel-bg.png');
          return (
            <View key={`ref-meeting-${id}`} className="gap-3">
              {prevItem.type === 'chat' && (
                <View className="flex-1 items-center">
                  <Text className="font-semibold text-gray-tertiary">——推荐转录内容——</Text>
                </View>
              )}
              <TranscriptionRefCard imgSource={imgSource} {...references} />
            </View>
          );
        }

        if (message.type === 'ref-meeting' && chatType === 'outsideMeeting') {
          console.log('meeting-ref-card:', message);
          const { references, id } = message as LocalMeetingRefMessageProps;
          return (
            <View key={`ref-meeting-${id}`} className="gap-3">
              {prevItem.type === 'chat' && (
                <View className="flex-1 items-center">
                  <Text className="font-semibold text-gray-tertiary">——推荐会议——</Text>
                </View>
              )}
              <MeetingRefCard
                imgSource={require('../../assets/imgs/carousel-bg.png')}
                {...references}
              />
            </View>
          );
        }
      }),
    [messages, chatType]
  );

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
          contentContainerStyle={{ gap: 12, paddingBottom: 30 }}
          contentContainerClassName="p-4"
          style={{ backgroundColor: '#ffffff' }}>
          {MemorizedMessages}
          {isLoading && (
            <Animated.View className="gap-2">
              <PhaseSection completedPhases={completedPhases} />
              {currentPhase && (
                <PhaseIndicator
                  loading={!currentPhase.completed}
                  phaseCode={currentPhase.phaseCode}
                />
              )}
              {replyMessage !== '' && (
                <MessageBubble
                  type="chat"
                  id={Date.now()}
                  text={replyMessage}
                  sender={SenderType.AI}
                />
              )}
            </Animated.View>
          )}
        </ScrollView>
      </View>
      {/* <View className="" style={{ paddingHorizontal: 18 }}>
                <Progress.CircleSnail
                  size={36}
                  duration={1000}
                  spinDuration={1000}
                  style={{ alignSelf: 'flex-start' }}
                />
              </View> */}

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
