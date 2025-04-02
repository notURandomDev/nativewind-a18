import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonAllinOne from 'components/ButtonAllinOne';

import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const NewNote = () => {
  const handleSaveNote = () => {
    router.back();
  };

  return (
    <SafeAreaView className="relative flex-1 bg-white">
      <LinearGradient
        colors={['rgba(21, 86, 240, 0.25)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']}
        locations={[0, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
        <View className="flex-row justify-between px-4 py-3">
          <ButtonAllinOne variant="ghost" onPress={() => router.back()}>
            <Ionicons size={24} name="chevron-back-outline" />
          </ButtonAllinOne>
          <View className="flex-row items-center gap-2">
            <Feather name="edit-3" size={24} color="black" />
            <Text className="text-2xl font-medium">{`标题`}</Text>
          </View>
          <ButtonAllinOne variant="ghost" onPress={handleSaveNote}>
            <Ionicons size={24} name="save-outline" />
          </ButtonAllinOne>
        </View>
      </TouchableOpacity>
      <MyTextInput />
    </SafeAreaView>
  );
};

const MyTextInput = () => {
  return (
    <TextInput
      multiline={true}
      placeholder="字句之间，写下你的想法"
      style={{ paddingHorizontal: 28, paddingVertical: 12, height: '50%' }}
      className="text-2xl font-light"
    />
  );
};

export default NewNote;
