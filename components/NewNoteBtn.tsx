import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const NEW_NOTE_BASEURL = '/newNote';
const NewNoteBtn = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push(NEW_NOTE_BASEURL);
      }}
      activeOpacity={1}
      style={{
        paddingVertical: 16,
        borderColor: '#1556F010',
        borderTopWidth: 1,
      }}
      className="flex-row items-center justify-center gap-1 border">
      <Ionicons name="add" size={24} />
      <Text className="text-2xl font-medium">新建笔记</Text>
    </TouchableOpacity>
  );
};

export default NewNoteBtn;
