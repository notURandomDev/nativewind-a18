import {
  View,
  Text,
  KeyboardAvoidingView,
  ImageSourcePropType,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { livechatMockData } from 'data/chat';
import Avatar from 'components/Avatar';
import MyTextInput from 'components/MyTextInput';

interface livechatMockMsgProps {
  avatar?: ImageSourcePropType;
  username: string;
  msg: string;
}

const Message = ({ avatar, username, msg }: livechatMockMsgProps) => (
  <View className="flex-row items-center gap-3">
    <View className="flex-row items-center gap-2">
      <Avatar />
      <Text className="text-lg text-gray-solid">{username}</Text>
    </View>
    <Text className="text-lg font-medium">{msg}</Text>
  </View>
);

interface MemorizedChatMessagesProps {
  msgs: livechatMockMsgProps[];
}

const ChatTab = () => {
  const [msgs, setMsgs] = useState(livechatMockData);

  const MemorizedChatMessages = useMemo(() => {
    return msgs.map(({ id, ...msg }) => <Message {...msg} key={`live-chat-msg-${id}`} />);
  }, [msgs]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 bg-white"
      keyboardVerticalOffset={355}
      style={{ marginBottom: 200 }}>
      <ScrollView
        style={{ paddingHorizontal: 24 }}
        className="flex-1"
        contentContainerClassName="gap-5 py-4">
        {MemorizedChatMessages}
      </ScrollView>
      <View className="border border-gray p-4" style={{ paddingBottom: 20 }}>
        <MyTextInput placeholder="发送友好的评论吧！" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatTab;
