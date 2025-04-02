import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Namecard = () => {
  return (
    <SafeAreaView className="relative flex-1 gap-4 bg-white p-4">
      <View className="flex-1 items-center justify-center border"></View>
    </SafeAreaView>
  );
};

export default Namecard;
