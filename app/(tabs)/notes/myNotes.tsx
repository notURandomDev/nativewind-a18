import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyTextInput from 'components/MyTextInput';
import { NoteItem, NoteItemProps } from 'components/NoteItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { deleteAllNotes, getNotes, NoteProps } from 'storage/noteStorage';
import TouchableIcon from 'components/TouchableIcon';
import { timestampConverter } from 'utils/timestampConverter';
import { useModal } from 'hooks/useModal';

/* const NOTES_DATA: Array<NoteItemProps> = [
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
]; */

const MyNotes = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    getNotesAsync();
  }, []);

  useEffect(() => {
    console.log('Notes:', notes);
  }, [notes]);

  const getNotesAsync = async () => {
    const res = await getNotes();
    setNotes(res);
  };

  const deleteNotesAsync = async () => {
    await deleteAllNotes();
    setNotes([]);
  };

  return (
    <View className="flex-1" style={{ paddingTop: 16 }}>
      <View className="flex-row items-center gap-4 px-4">
        <TouchableIcon onPress={getNotesAsync}>
          <Ionicons size={24} name="refresh-outline" />
        </TouchableIcon>
        <View className="flex-1">
          <MyTextInput placeholder="搜索笔记内容" size="sm" />
        </View>
        <TouchableIcon onPress={deleteNotesAsync}>
          <Ionicons color="red" size={24} name="trash-outline" />
        </TouchableIcon>
      </View>
      <ScrollView contentContainerClassName="gap-4 px-4" className="relative py-5">
        {/*  {NOTES_DATA.map((note) => (
          <NoteItem category={note.category} />
        ))} */}
        {notes.map(({ title, content, timestamp, category, id }) => {
          const { year, month, day, hour, minute } = timestampConverter(timestamp);
          const date = `${year}年${month}月${day}日 ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          return (
            <NoteItem
              id={id}
              key={`note-${id}`}
              date={date}
              preview={content}
              title={title}
              category={category}
              onDelete={getNotesAsync}
              onCategorize={() => setTimeout(getNotesAsync, 100)}
            />
          );
        })}
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
