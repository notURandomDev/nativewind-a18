import { View, Text, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import React, { forwardRef, LegacyRef, ReactNode } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

interface MyTextInputProps {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  size?: 'default' | 'sm';
  searchInput?: boolean;
}

const MyTextInput = forwardRef<TextInput, MyTextInputProps>(
  ({ onChangeText, value, placeholder, icon, size = 'default', searchInput = true }, ref) => {
    const containerDimension = {
      default: {
        height: 45,
      },
      sm: {
        height: 40,
      },
    };

    const textInputDimension = {
      default: {
        fontSize: 20,
        paddingHorizontal: 8,
      },
      sm: {
        fontSize: 16,
        paddingHorizontal: 8,
      },
    };

    return (
      <View
        style={[{ borderRadius: 30, borderWidth: 2.5 }, containerDimension[size]]}
        className="flex-row items-center gap-0 border border-blue px-2 py-1">
        {searchInput && <Ionicons size={20} color="#8B8B8B" name="search-outline" />}
        <TextInput
          className="flex-1 p-2 font-light"
          ref={ref}
          style={textInputDimension[size]}
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
