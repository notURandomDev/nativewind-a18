import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyTextInput from 'components/MyTextInput';
import { NoteItem, NoteItemProps } from 'components/NoteItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getNoteData, NoteProps } from 'storage/noteStorage';

const NOTES_DATA: Array<NoteItemProps> = [
  {
    id: 1,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    preview: '随着大语言模型与云的结合，技...',
    category: 'UNCATEGORIZED',
  },
  {
    id: 2,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    preview: '随着大语言模型与云的结合，技...',
    category: 'WORK',
  },
  {
    id: 3,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    preview: '随着大语言模型与云的结合，技...',
    category: 'UNCATEGORIZED',
  },
  {
    id: 4,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    preview: '随着大语言模型与云的结合，技...',
    category: 'UNCATEGORIZED',
  },
];

const MyNotes = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    getNoteDataAsync();
  }, []);

  useEffect(() => {
    console.log('Notes:', notes);
  }, [notes]);

  const getNoteDataAsync = async () => {
    const res = await getNoteData();
    setNotes(res);
  };

  return (
    <View className="flex-1" style={{ paddingTop: 16 }}>
      <View className="px-4 text-blue">
        <MyTextInput placeholder="搜索笔记内容" size="sm" />
      </View>
      <ScrollView contentContainerClassName="gap-4 px-4" className="relative py-5">
        {NOTES_DATA.map((note) => (
          <NoteItem category={note.category} />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push('../../../newNote');
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
    </View>
  );
};

export default MyNotes;
