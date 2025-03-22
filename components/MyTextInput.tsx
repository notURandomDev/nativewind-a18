import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { forwardRef, LegacyRef, ReactNode } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

interface MyTextInputProps {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
}

const MyTextInput = forwardRef<TextInput, MyTextInputProps>(
  ({ onChangeText, value, placeholder, icon }, ref) => {
    return (
      <View
        style={{ borderRadius: 30, borderWidth: 2, height: 45 }}
        className="flex-row items-center gap-2 border border-blue px-4 py-1">
        {icon}
        <TextInput
          ref={ref}
          style={{ fontSize: 18 }}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#8b8b8b"
        />
      </View>
    );
  }
);

export default MyTextInput;
