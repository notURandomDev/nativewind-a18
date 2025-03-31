import ButtonAllinOne from 'components/ButtonAllinOne';
import { Ref, useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Foundation from '@expo/vector-icons/Foundation';

import * as Haptics from 'expo-haptics';
import { BottomToolBoxProps } from './types';

const BottomToolBox = ({
  textInputRef,
  onSubmit,
  onKeyboardToggle,
  onDeleteChat,
  onDisconnectSSE,
  sseLinkState,
}: BottomToolBoxProps) => {
  const [textInputValue, setTextInputValue] = useState('');

  const handleSubmit = () => {
    if (textInputValue) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onSubmit(textInputValue);
      setTextInputValue('');
    }
  };

  return (
    <View className="gap-3 px-4" style={{ paddingBottom: 40 }}>
      <View
        style={[
          {
            borderRadius: 17,
            paddingTop: 10,
            paddingBottom: 16,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        ]}
        className="gap-4 rounded-lg border border-gray-tertiary px-4">
        <View className="flex-row justify-center gap-4">
          <ButtonAllinOne variant="ghost" onPress={onKeyboardToggle}>
            <FontAwesome6 name="keyboard" size={24} color="#626262" />
          </ButtonAllinOne>
          <TextInput
            ref={textInputRef}
            value={textInputValue}
            onChangeText={(text) => setTextInputValue(text)}
            style={{ fontSize: 18 }}
            className="flex-1 justify-center text-wrap font-medium"
            placeholder="有问题尽管问安小恒！"
            placeholderTextColor="#8b8b8b"
          />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-3">
            <View className="rounded-lg border border-gray-tertiary p-2">
              <Feather name="edit-3" size={20} color="#626262" />
            </View>
            <View className="rounded-lg border border-gray-tertiary p-2">
              <Feather name="camera" size={20} color="#626262" />
            </View>
            <View className="rounded-lg border border-gray-tertiary p-2">
              <Feather name="image" size={20} color="#626262" />
            </View>
            <View className="rounded-lg border border-gray-tertiary p-2">
              <Feather name="file-plus" size={20} color="#626262" />
            </View>
            <ButtonAllinOne variant="ghost" onPress={onDeleteChat}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </ButtonAllinOne>
            {/* {sseLinkState && (
              <ButtonAllinOne variant="ghost" onPress={onDisconnectSSE}>
                <Foundation name="unlink" size={20} color="red" />
              </ButtonAllinOne>
            )} */}
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={sseLinkState ? onDisconnectSSE : handleSubmit}
            className={`items-center justify-center rounded-full`}
            style={{ width: 36, height: 36 }}>
            {sseLinkState ? (
              <Foundation name="unlink" size={20} color="red" />
            ) : (
              <Ionicons
                size={24}
                color={`${textInputValue.length ? '#1556F0' : '#F5F8FF'}`}
                name="paper-plane"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomToolBox;
