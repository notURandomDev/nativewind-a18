import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useRef, useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

const Modal = () => {
  const textInputRef = useRef<TextInput>(null);
  const [textInputValue, setTextInputValue] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#ffffff' }}
      contentContainerStyle={{ backgroundColor: '#ffffff' }}
      className="flex-1 bg-white"
      keyboardVerticalOffset={20}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View style={{ marginBottom: 0 }} className="flex-1 p-4">
          <ScrollView contentContainerClassName="gap-4">
            <View className="flex-row justify-end">
              <View
                style={{
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
                className="bg-blue">
                <Text className="text-xl text-white">你好！</Text>
              </View>
            </View>
            <View className="flex-row">
              <View
                style={{
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
                className="bg-blue-faint">
                <Text className="text-xl ">你好！有什么我可以帮到你的吗？</Text>
              </View>
            </View>
          </ScrollView>

          <View className="gap-3" style={{ paddingBottom: 90 }}>
            <View
              style={{ borderRadius: 20, borderWidth: 2, height: 50 }}
              className="justify-center border border-blue p-4">
              <TextInput
                style={{ fontSize: 18 }}
                className=""
                onChangeText={(text) => setTextInputValue(text)}
                value={textInputValue}
                placeholder="有问题尽管问安小恒！"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row gap-5">
                <Feather name="edit-3" size={24} color="#1556F0" />
                <Feather name="camera" size={24} color="#1556F0" />
                <Feather name="image" size={24} color="#1556F0" />
                <Feather name="file-plus" size={24} color="#1556F0" />
              </View>
              <View className="flex-row gap-2">
                <ButtonAllinOne label="导入笔记" variant="outline" />
                <ButtonAllinOne label="+ AI会议总结" variant="outline" />
                <View className="rounded-full bg-blue " style={{ padding: 8 }}>
                  <Ionicons size={16} color="#ffffff" name="paper-plane-outline" />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Modal;
