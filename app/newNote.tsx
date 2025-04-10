import { View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonAllinOne from 'components/ButtonAllinOne';

import { Ionicons, Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { createNote, getNote, getNotes, updateNote } from 'storage/noteStorage';

const NewNote = () => {
  const { noteId }: { noteId: string } = useLocalSearchParams();

  const [title, setTitle] = useState('未命名笔记');
  const [textInputValue, setTextInputValue] = useState('');

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    getNoteAsync();
  }, [noteId]);

  const getNoteAsync = async () => {
    if (noteId) {
      const note = await getNote(noteId);
      setTitle(note?.title || '');
      setTextInputValue(note?.content || '');
    }
  };

  const handleSaveNote = async () => {
    if (noteId) {
      await updateNote(noteId, title, textInputValue);
    } else {
      await createNote(textInputValue.trim(), 'default', title);
    }
    router.back();
  };

  const handleBack = () => {
    if (title === '未命名笔记' && textInputValue === '') {
      router.back();
    } else {
      Alert.alert('您有未保存的笔记', '确定要退出吗？', [
        { text: '取消', style: 'cancel' },
        { text: '确定', style: 'default', onPress: () => router.back() },
      ]);
    }
  };

  useEffect(() => {
    setTimeout(() => textInputRef.current?.focus(), 500);
  }, []);

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
          <ButtonAllinOne variant="ghost" onPress={handleBack}>
            <Ionicons size={24} name="chevron-back-outline" />
          </ButtonAllinOne>
          <View className="flex-1 flex-row items-center justify-center gap-2 px-1">
            <Feather name="edit-3" size={24} color="black" />
            <TextInput onChangeText={setTitle} value={title} className="text-2xl font-medium" />
          </View>
          <ButtonAllinOne disabled={textInputValue === ''} variant="ghost" onPress={handleSaveNote}>
            <Ionicons
              color={textInputValue === '' ? '#8B8B8B' : '#000000'}
              size={24}
              name="save-outline"
            />
          </ButtonAllinOne>
        </View>
      </TouchableOpacity>
      <TextInput
        ref={textInputRef}
        onChangeText={setTextInputValue}
        value={textInputValue}
        multiline={true}
        placeholder="字句之间，写下你的想法"
        style={{ paddingHorizontal: 28, paddingVertical: 12, height: '50%' }}
        className="text-2xl font-light"
      />
    </SafeAreaView>
  );
};

export default NewNote;
