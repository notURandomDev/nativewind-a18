import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

interface TintedBackgroundProps {
  children?: ReactNode;
  label?: string;
}

const TintedBackground = ({ children, label }: TintedBackgroundProps) => {
  return (
    <View
      className=" gap-4 bg-blue-faint"
      style={{ flexGrow: 1, borderRadius: 17, paddingHorizontal: 16, paddingVertical: 20 }}>
      <View className="flex-row items-center gap-2">
        <Ionicons name="ellipse" size={14} color="#1556F0" />
        <Text className="text-xl font-medium text-blue">{label}</Text>
      </View>
      {children}
    </View>
  );
};

export default TintedBackground;
