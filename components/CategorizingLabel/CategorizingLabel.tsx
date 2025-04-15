import { View, Text } from 'react-native';
import React from 'react';
import { CategorizingLabelProps } from './types';
import { Ionicons, Feather } from '@expo/vector-icons';

const CategorizingLabel = ({
  label = '标题',
  accentColor = '#1556F0',
  sublabel = '副标题',
}: CategorizingLabelProps) => (
  <View className="flex-1 flex-row items-center justify-between gap-2" style={{ paddingRight: 12 }}>
    <View className="flex-row items-baseline gap-2">
      <View className="flex-row items-center gap-2">
        <Ionicons name="ellipse" size={16} color={accentColor} />
        <View className="relative">
          <View
            style={{ backgroundColor: accentColor, height: 8 }}
            className="absolute bottom-0 left-0 right-0 flex-1"></View>
          <Text className="text-3xl font-medium">{label}</Text>
        </View>
      </View>
      <Text className="text-base font-light text-gray" style={{ color: '#9F9F9F' }}>
        {sublabel}
      </Text>
    </View>
    <Feather name="filter" size={24} color="black" />
  </View>
);

export default CategorizingLabel;
