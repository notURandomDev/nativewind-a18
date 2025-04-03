import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MyTextInput from 'components/MyTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as Haptics from 'expo-haptics';
import { ScrollView } from 'react-native-gesture-handler';
import { NoteItem } from 'components/NoteItem';
import { NoteCategory } from 'storage/noteStorage';
import CategorySelectionModal from 'components/CategoryModal';

const NOTE_ITEMS = [
  {
    id: 1,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'UNCATEGORIZED',
  },
  {
    id: 2,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'PRIVATE',
  },
  {
    id: 3,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'MEETING',
  },
  {
    id: 4,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'WORK',
  },
  {
    id: 5,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'PRIVATE',
  },
];

interface NoteItemProps {
  category?: NoteCategory;
  updateSelectedNote?: () => void;
  cb?: () => void;
}

const MyNotesView = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState({ id: -1, category: '' });
  const [noteItems, setNoteItems] = useState(NOTE_ITEMS);

  const selectedNoteRef = useRef(null);

  const handleNoteCreation = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsModalVisible(true);
  };

  const handleNoteCategorization = (newCategory: string) => {
    setNoteItems((prevNoteItems) =>
      prevNoteItems.map((item) =>
        item.id === selectedNote.id ? { ...item, category: newCategory } : item
      )
    );
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log('on selectedNote change:', selectedNote);
  }, [selectedNote]);

  return (
    <View>
      <View className="px-8">
        <MyTextInput
          icon={<Ionicons size={18} name="search-outline" color="#8b8b8b" />}
          placeholder="搜索笔记"
        />
      </View>
      <View className="">
        <ScrollView
          contentContainerClassName="gap-4 px-8"
          style={{ height: 310 }}
          contentContainerStyle={{ flexGrow: 1, display: 'flex', paddingVertical: 12 }}>
          {noteItems.map(({ id, category }) => (
            <NoteItem
              updateSelectedNote={() => setSelectedNote({ id, category })}
              category={category}
              key={`note-item-${id}`}
              onCategorize={() => setIsModalVisible(true)}
            />
          ))}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleNoteCreation}
          style={{
            paddingVertical: 16,
            borderColor: '#1556F010',
            borderTopWidth: 1,
          }}
          className=" flex-row items-center justify-center gap-1">
          <Ionicons name="add" size={24} />
          <Text className="text-2xl font-medium">新建笔记</Text>
        </TouchableOpacity>
      </View>
      <CategorySelectionModal
        initialCategory={selectedNote}
        dismissModal={handleNoteCategorization}
        isModalVisible={isModalVisible}
      />
    </View>
  );
};

export default MyNotesView;
