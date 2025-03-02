import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HeadingProps {
  children?: string;
  icon?: undefined | ReactNode;
}

const Heading = ({ children: title = '默认标题', icon }: HeadingProps) => {
  return (
    <View className="flex-row items-center gap-2">
      {icon}
      <Text className="text-wrap text-xl">{title}</Text>
    </View>
  );
};

export default Heading;
