import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface BackToEndBtnProps {
  show?: boolean;
  onPress?: () => void;
}
const BackToEndBtn = ({ show, onPress = () => undefined }: BackToEndBtnProps) => {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  useEffect(() => {
    if (show) {
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [show]);

  return (
    <Animated.View className="absolute" style={[{ bottom: 100, right: 25 }, animatedStyle]}>
      <TouchableOpacity
        onPress={handlePress}
        style={{ padding: 10, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
        className="rounded-full border border-gray-solid bg-white">
        <Ionicons size={16} name="chevron-down" color={'#8b8b8b'} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BackToEndBtn;
