import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { twMerge } from 'tailwind-merge';
interface TintedBackgroundProps {
  children?: ReactNode;
  label?: string;
  labelClassName?: string;
  dotColor?: string;
}

const TintedBackground = ({
  children,
  label,
  labelClassName,
  dotColor = '#1556F0',
}: TintedBackgroundProps) => {
  return (
    <View
      className="gap-4 bg-blue-faint"
      style={{ flexGrow: 1, borderRadius: 17, paddingHorizontal: 16, paddingVertical: 20 }}>
      <View className="flex-row items-center gap-2">
        <Ionicons name="ellipse" size={14} color={dotColor} />
        <Text className={twMerge('text-xl font-medium text-blue', labelClassName)}>{label}</Text>
      </View>
      {children}
    </View>
  );
};

export default TintedBackground;
