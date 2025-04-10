import { View, Text } from 'react-native';
import React from 'react';
import Avatar from './Avatar';

interface PersonInfoProps {
  label?: string;
  sublabel?: string;
}

const PersonInfo = ({ label = '', sublabel = '' }: PersonInfoProps) => {
  return (
    <View className="flex-row items-center gap-1">
      <Avatar />
      <View className="flex-1 flex-row items-baseline">
        <Text className="text-lg">{label}</Text>
        <Text numberOfLines={1} className="flex-1 text-sm">
          {sublabel ? '/' + sublabel : ''}
        </Text>
      </View>
    </View>
  );
};

export default PersonInfo;
