import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MyTextInput from 'components/MyTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';

import ButtonAllinOne from 'components/ButtonAllinOne';
import * as Haptics from 'expo-haptics';
import { ScrollView } from 'react-native-gesture-handler';
import { NoteItem } from 'components/NoteItem';

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
  category?: 'PRIVATE' | 'WORK' | 'MEETING' | 'NEW' | 'DEFAULT' | 'UNCATEGORIZED';
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
              cb={() => setIsModalVisible(true)}
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

interface NoteProps {
  id: number;
  category: string;
}

const CategorySelectionModal = ({
  dismissModal,
  isModalVisible,
  initialCategory,
}: {
  dismissModal: (category: string) => void;
  isModalVisible: boolean;
  initialCategory: NoteProps;
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory.category);

  const onDismissModal = () => {
    dismissModal(selectedCategory);
  };

  useEffect(() => {
    setSelectedCategory(initialCategory.category);
  }, [initialCategory]);

  return (
    <Modal animationType="slide" transparent={true} style={{ margin: 0 }} visible={isModalVisible}>
      <View className="flex-1 justify-end">
        <View
          className=" bg-white"
          style={{
            borderRadius: 17,
            paddingBottom: 28,
            paddingHorizontal: 28,
            shadowRadius: 40,
            shadowColor: '#00026C65',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
          }}>
          <View className="items-center">
            <ButtonAllinOne onPress={onDismissModal} variant="ghost">
              <Ionicons size={28} name="chevron-down" />
            </ButtonAllinOne>
          </View>
          <View>
            <Text style={{ fontSize: 28, paddingBottom: 20 }}>请选择分类</Text>
          </View>
          <View className="" style={{ gap: 26, paddingBottom: 20 }}>
            {CATEGORY_LABELS.map(({ label, category }, idx) => (
              <Category
                key={`cat-${idx}`}
                isActive={category === selectedCategory}
                label={label}
                category={category}
                pressCb={() => setSelectedCategory(category)}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={onDismissModal}
            activeOpacity={1}
            className="items-center bg-blue-faint"
            style={{ paddingVertical: 16, borderRadius: 17 }}>
            <Text className="text-2xl font-medium text-blue">确认</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const COLORS = new Map([
  ['PRIVATE', '#00BBFF25'],
  ['WORK', '#FF4E7425'],
  ['MEETING', '#FFBB0025'],
  ['UNCATEGORIZED', '#8b8b8b'],
  ['NEW', '#c7c7c7'],
]);

const CATEGORY_LABELS = [
  { label: '个人', category: 'PRIVATE' },
  { label: '工作', category: 'WORK' },
  { label: '圆桌会议', category: 'MEETING' },
  { label: '未分类', category: 'UNCATEGORIZED' },
  { label: '新建', category: 'NEW' },
];

interface CategoryProps {
  label?: string;
  isActive?: boolean;
  category: string | 'UNCATEGORIZED';
  pressCb?: () => void;
}

const Category = ({ label, category, isActive = false, pressCb = () => {} }: CategoryProps) => {
  const ActiveCircle = () => (
    <View className="rounded-full bg-blue">
      <Ionicons size={30} name="ellipse" color="#ffffff" />
    </View>
  );

  const InactiveCircle = () => (
    <View className="">
      <Ionicons size={30} name="ellipse-outline" color="#C7C7C7" />
    </View>
  );

  return (
    <TouchableOpacity
      onPress={() => {
        pressCb();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      activeOpacity={1}
      className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <View
          className="bg-blue p-4"
          style={{ borderRadius: 7.5, backgroundColor: COLORS.get(category) }}></View>
        <Text style={{ fontSize: 20 }} className="">
          {label}
        </Text>
      </View>
      {isActive ? <ActiveCircle /> : <InactiveCircle />}
    </TouchableOpacity>
  );
};

export default MyNotesView;
