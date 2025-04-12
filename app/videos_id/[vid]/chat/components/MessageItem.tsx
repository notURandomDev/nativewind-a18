import { View, Text } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { MsgProps } from './types';

const MessageItem = ({ avatar, username, msg, isSelf = false }: MsgProps) => (
  <View
    style={{ borderColor: isSelf ? '#1556f0' : '#F5F8FF', gap: 10, borderWidth: isSelf ? 2 : 1 }}
    className={`flex-row rounded-lg  ${isSelf ? 'bg-white' : 'bg-blue-faint'} px-2 py-3`}>
    <Image
      className="rounded-full"
      style={{ height: 30, width: 30 }}
      source={isSelf ? require('../../../../../assets/imgs/boss.jpg') : { uri: avatar }}
    />
    <View className="flex-1 gap-1">
      <Text className="text-xl font-medium">{username}</Text>
      <Text className="flex-1 text-lg text-gray-solid">{msg}</Text>
    </View>
  </View>
);

export default MessageItem;
