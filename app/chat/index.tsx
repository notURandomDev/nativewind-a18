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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { Server, WebSocket } from 'mock-socket';
import { clearChat, loadChat, saveChat } from 'storage/fakeDatabase';
var debounce = require('lodash.debounce');

interface messageProps {
  id?: string;
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
      className={sender === USER ? 'bg-blue' : ''}>
      <Text
        style={{ fontSize: 20, lineHeight: 28 }}
        className={`${sender === USER && 'font-light text-white'} `}>
        {text}
      </Text>
    </View>
  </View>
);

const Modal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [bottomInset, setBottomInset] = useState(0);

  const flatListRef = useRef<FlatList>(null);
  const textInputRef = useRef<TextInput>(null);
  const messagesRef = useRef<Array<messageProps>>(messages);
  const scrollViewRef = useRef<ScrollView>(null);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  console.log('modal re-render triggered');

  const initChat = async () => {
    const chatData = await loadChat(1);
    setMessages([...chatData]);
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
      }, 100);
    });

    setTimeout(() => {
      if (textInputRef?.current) textInputRef.current.focus();
    }, 100);
  };

  const quitChat = async () => {
    const res = await saveChat(1, messagesRef.current);
    // clearChat(1);
  };

  useEffect(() => {
    console.log('---modal mounted---');
    initChat();
    initKbdCfg();

    return () => {
      quitChat();
      console.log('unmounted');
    };
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  /* useEffect(() => {
    

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []); */

  const handleSubmit = async () => {
    const newMessage = {
      id: Date.now().toString(),
      text: textInputValue,
      sender: USER,
    };
    Keyboard.dismiss();

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTextInputValue('');
    mockSSE();
  };

  const mockSSE = () => {
    const reply =
      'Lorem Ipsum生成器，也称虚拟文本生成器，乱数假文生成器，支持随机生成指定数量段落的测试文章，用于测试不同字型和版型下的排版效果。\n当设计师或排版师需要填充内容时，Lorem Ipsum是一种常用的占位文本。它的目的是让人专注于布局、字体、颜色等设计元素，而不是实际的内容。Lorem Ipsum是一个拉丁文的占位文本，通常用于填充书籍、杂志、网页等排版设计中。\nLorem Ipsum生成器是一种工具，用于生成指定数量段落和指定长度的Lorem Ipsum文本。它可以节省设计师和排版师的时间，因为他们不需要手动编写和排版Lorem Ipsum文本。相反，他们可以使用Lorem Ipsum生成器来快速生成所需数量的Lorem Ipsum文本，并将其直接插入设计中，可以帮助设计师和排版师更好地进行视觉设计工作，并且可以提高工作效率。'.split(
        ''
      );
    setIsLoading(true);
    let accReply = '';

    const interval = setInterval(() => {
      if (reply.length) {
        const ch = reply.shift();
        accReply += ch;
        setReplyMessage(accReply);
        scrollViewRef.current?.scrollToEnd();
      } else {
        clearInterval(interval);

        setMessages((prevMsgs) => {
          const newMsg = { id: Date.now().toString(), text: accReply, sender: AI };
          setReplyMessage('');
          return [...prevMsgs, newMsg];
        });
        setIsLoading(false);
      }
    }, 10);
  };

  const MemorizedMessages = useMemo(() => {
    return messages.map(({ text, sender, id }: messageProps) => (
      <MessageBubble key={`message-${id}`} text={text} sender={sender} />
    ));
  }, [messages]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={20}
      className="flex-1"
      behavior="padding"
      style={{ backgroundColor: '#ffffff', marginBottom: 55 }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerClassName="gap-3 p-4"
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: '#ffffff' }}>
        {MemorizedMessages}
        {isLoading && (
          <Animated.View style={{ marginBottom: 150 }}>
            <MessageBubble text={replyMessage} sender={AI} />
          </Animated.View>
        )}
      </ScrollView>

      {/* Bottom Toolbar */}
      <View className="gap-3 p-4" style={{ paddingBottom: 50 }}>
        <View
          style={{ borderRadius: 20, borderWidth: 2, height: 50 }}
          className="justify-center border border-blue p-4">
          <TextInput
            ref={textInputRef}
            style={{ fontSize: 20 }}
            onChangeText={setTextInputValue}
            value={textInputValue}
            placeholder="有问题尽管问安小恒！"
          />
        </View>
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
