import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';

const TouchableIcon = ({ children, onPress = () => {} }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };
  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableIcon;
