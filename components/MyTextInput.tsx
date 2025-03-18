import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { forwardRef, LegacyRef } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

interface MyTextInputProps {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
}

const MyTextInput = forwardRef<TextInput, MyTextInputProps>(
  ({ onChangeText, value, placeholder }, ref) => {
    return (
      <View
        style={{ borderRadius: 30, borderWidth: 2, height: 50 }}
        className="justify-center border border-blue p-4">
        <TextInput
          ref={ref}
          style={{ fontSize: 18 }}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
        />
      </View>
    );
  }
);

export default MyTextInput;
