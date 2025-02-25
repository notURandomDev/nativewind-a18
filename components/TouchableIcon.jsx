import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const TouchableIcon = ({
  children,
  onPress = () => {
    console.log('TouchableIcon Pressed');
  },
}) => {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
};

export default TouchableIcon;
