import { View, Text } from 'react-native';
import React from 'react';
import { LocalNoteItemProps } from './types';

const LocalNoteItem = ({ bgColor = '#FF3F3F10', title, date, preview }: LocalNoteItemProps) => (
  <View
    style={[
      {
        position: 'relative',
        borderRadius: 17,
        backgroundColor: bgColor,
      },
    ]}
    className="gap-0.5 p-4">
    <Text className="text-xl font-medium">{title}</Text>
    <View className="flex-row">
      <Text className="font-light text-gray-solid">{date}</Text>
      <Text>｜</Text>
      <Text numberOfLines={1} className="flex-1 font-light text-gray-solid">
        {preview}
      </Text>
    </View>
  </View>
);

export default LocalNoteItem;
