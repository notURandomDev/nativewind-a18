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
      style={{ flexGrow: 1, borderRadius: 17, paddingHorizontal: 0 /* 16 */, paddingVertical: 20 }}>
      <View className="flex-row items-center gap-2" style={{ marginStart: 24 }}>
        <Ionicons name="ellipse" size={16} color={dotColor} />
        <Text className={twMerge('text-2xl font-semibold text-blue', labelClassName)}>{label}</Text>
      </View>
      {children}
    </View>
  );
};

export default TintedBackground;
