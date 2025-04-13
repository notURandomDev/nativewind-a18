import { View, Text, Image } from 'react-native';
import React from 'react';
import Avatar from './Avatar';
import Pravatar from './Pravatar';

interface PersonInfoProps {
  label?: string;
  sublabel?: string;
}

const PersonInfo = ({ label = '', sublabel = '' }: PersonInfoProps) => {
  return (
    <View className="flex-row items-center gap-1">
      {label === '范渊' ? (
        <Image
          className="rounded-full"
          style={{ height: 30, width: 30 }}
          source={require('../assets/imgs/boss.jpg')}
        />
      ) : (
        <Pravatar />
      )}
      <View className="flex-1 items-baseline">
        <Text className="text-lg font-medium">{label}</Text>
        <Text numberOfLines={1} className="flex-1 text-sm text-gray-text">
          {sublabel}
        </Text>
      </View>
    </View>
  );
};

export default PersonInfo;
