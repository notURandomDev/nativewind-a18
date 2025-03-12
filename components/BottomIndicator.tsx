import { View, Text } from 'react-native';
import React from 'react';

const BottomIndicator = () => {
  return (
    <View className="items-center justify-center pb-6">
      <Text className="text-sm font-light text-gray-tertiary">—— 已到底部 ——</Text>
    </View>
  );
};

export default BottomIndicator;
