import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { Server, WebSocket } from 'mock-socket';
import { loadChat, saveChat } from 'storage/fakeDatabase';
var debounce = require('lodash.debounce');

interface messageProps {
  text: string;
  sender: number;
}

const USER = 0;
const AI = 1;

const MessageBubble = ({ text, sender }: messageProps) => (
  <View className={`${sender === USER && 'justify-end'} flex-row `}>
    <View
      style={{
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: sender === USER ? 12 : 0,
        borderBottomRightRadius: sender === USER ? 0 : 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      className={sender === USER ? 'bg-blue' : 'bg-blue-faint'}>
      <Text className={`${sender === USER && 'text-white'} text-xl`}>{text}</Text>
    </View>
  </View>
);

const MemorizedFlatList = React.memo(({ flatListRef, messages }: any) => {
  console.log('MemorizedFlatList re-rendered');
  return (
    <FlatList
      ref={flatListRef}
      contentContainerStyle={{ paddingBottom: 20 }}
      contentContainerClassName="gap-3"
      data={messages}
      renderItem={({ item: { text, sender } }) => <MessageBubble text={text} sender={sender} />}
      keyExtractor={(item) => item.id}
    />
  );
});

const Modal = () => {
  const flatListRef = useRef<FlatList>(null);
  const textInputRef = useRef<TextInput>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [textInputValue, setTextInputValue] = useState('');

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  console.log('modal re-render triggered');

  const initChat = async () => {
    const chatData = await loadChat(1);
    setMessages([...chatData]);
  };

  const initKbdCfg = () => {
    setTimeout(() => {
      if (textInputRef?.current) textInputRef.current.focus();
    }, 100);
  };

  useEffect(() => {
    console.log('---modal mounted---');
    initChat();
    initKbdCfg();

    return () => {
      console.log('unmounted');
    };
  }, []);

  /* useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []); */

  const handleSubmit = async () => {
    const newMessage = {
      id: Date.now().toString(),
      // text: textInputValue,
      sender: USER,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // setTextInputValue('');
    // setIsLoading(true);
    mockSSE();
    Keyboard.dismiss();
    flatListRef.current?.scrollToEnd();
  };

  const mockSSE = () => {
    const reply = 'this is JS-mocked sse response'.split('');

    let accumulatedMessage = '';

    const interval = setInterval(() => {
      if (reply.length) {
        const ch = reply.shift();
        accumulatedMessage += ch;
        setReplyMessage(accumulatedMessage);
      } else {
        clearInterval(interval);
        setMessages((prevMsgs) => [
          ...prevMsgs,
          { id: Date.now().toString(), text: accumulatedMessage, sender: AI },
        ]);
        setReplyMessage('');
      }
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#ffffff' }}
      contentContainerStyle={{ backgroundColor: '#ffffff' }}
      className="flex-1 bg-white"
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 p-4 ">
          <MemorizedFlatList flatListRef={flatListRef} messages={messages} />
          <View className="gap-3" style={{ paddingBottom: 55 }}>
            <View
              style={{ borderRadius: 20, borderWidth: 2, height: 50 }}
              className="justify-center border border-blue p-4">
              <TextInput
                ref={textInputRef}
                style={{ fontSize: 18 }}
                className=""
                onChangeText={setTextInputValue}
                value={textInputValue}
                placeholder="有问题尽管问安小恒！"
              />
            </View>
            {keyboardVisible ? (
              <View className="flex-row items-center justify-between">
                <View className="flex-row gap-5">
                  <Feather name="edit-3" size={24} color="#1556F0" />
                  <Feather name="camera" size={24} color="#1556F0" />
                  <Feather name="image" size={24} color="#1556F0" />
                  <Feather name="file-plus" size={24} color="#1556F0" />
                </View>
                <View className="flex-row gap-2">
                  <ButtonAllinOne label="导入笔记" variant="outline" />
                  <ButtonAllinOne label="+ AI会议总结" variant="outline" />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className={`${isLoading ? 'bg-blue-faint' : 'bg-blue'} rounded-full`}
                    style={{ padding: 8 }}>
                    <Ionicons size={16} color="#ffffff" name="paper-plane-outline" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Modal;
