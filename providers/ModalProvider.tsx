import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, createContext, ReactNode, useContext, useRef } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonAllinOne from 'components/ButtonAllinOne';

import * as Haptics from 'expo-haptics';
import { NoteCategory, updateNoteCategory } from 'storage/noteStorage';
import { NoteTags } from 'app/videos_id/[vid]/digest/transcribe';

export const ModalContext = createContext<ModalContextType | null>(null);

export const CategoryConfigs: CategoryConfigsProps[] = [
  { label: '个人', category: 'personal', color: '#00BBFF25' },
  { label: '工作', category: 'work', color: '#FF4E7425' },
  { label: '圆桌会议', category: 'meeting', color: '#FFBB0025' },
  { label: '未分类', category: 'default', color: '#ffffff' },
];

interface CategoryConfigsProps {
  label: string;
  category: NoteCategory;
  color: string;
}
/* Modal Provider */

type ModalNoteProps = {
  id: string;
  category: NoteCategory;
};

const DEFAULT_NOTE: ModalNoteProps = { id: '', category: 'default' };

interface ModalContextType {
  showModal: (note: ModalNoteProps) => void;
  setOnDismissCb: (newOnDismissCb: () => void) => void;
}
const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState<ModalNoteProps>(DEFAULT_NOTE);

  const onDismissCb = useRef<() => void>(() => {});

  const setOnDismissCb = (newOnDismissCb: () => void) => {
    onDismissCb.current = newOnDismissCb;
  };

  const dismissModal = () => {
    Haptics;
    onDismissCb.current();
    updateNoteCategoryAsync();
    setModalVisible(false);
  };

  const handleCategoryChange = (category: NoteCategory) => {
    setNote((prev) => ({ category, id: prev.id }));
  };

  const showModal = (note: ModalNoteProps) => {
    setNote(note);
    setModalVisible(true);
  };

  const updateNoteCategoryAsync = async () => {
    await updateNoteCategory(note.id, note.category);
  };

  return (
    <ModalContext.Provider value={{ showModal, setOnDismissCb }}>
      {children}
      <CategorySelectionModal
        onDismiss={dismissModal}
        selectedCategory={note.category}
        isModalVisible={modalVisible}
        onCategoryChange={handleCategoryChange}
      />
    </ModalContext.Provider>
  );
};

/* Category Selection Modal */

interface CategorySelectionModal {
  onDismiss: () => void;
  onCategoryChange: (category: NoteCategory) => void;
  isModalVisible: boolean;
  selectedCategory: NoteCategory;
}
const CategorySelectionModal = ({
  onDismiss,
  onCategoryChange,
  isModalVisible,
  selectedCategory,
}: CategorySelectionModal) => {
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
            <ButtonAllinOne onPress={onDismiss} variant="ghost">
              <Ionicons size={28} name="chevron-down" />
            </ButtonAllinOne>
          </View>
          <View>
            <Text style={{ fontSize: 28, paddingBottom: 20 }}>请选择分类</Text>
          </View>
          <View className="" style={{ gap: 26, paddingBottom: 20 }}>
            {/*  {CATEGORY_LABELS.map(({ label, category }, idx) => (
              <Category
                key={`cat-${idx}`}
                isActive={category === selectedCategory}
                label={label}
                category={category}
                pressCb={() => onCategoryChange(category)}
              />
            ))} */}
            {CategoryConfigs.map(({ label, category }, index) => (
              <Category
                key={`category-option-${index}`}
                isActive={category === selectedCategory}
                label={label}
                category={category}
                pressCb={() => onCategoryChange(category)}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onDismiss();
            }}
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

/* Category Item */

interface CategoryProps {
  label?: string;
  isActive?: boolean;
  category: NoteCategory;
  pressCb?: () => void;
}
const Category = ({ label, category, isActive = false, pressCb = () => {} }: CategoryProps) => {
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
          className={`bg-blue p-4 ${category === 'default' ? 'border border-gray' : ''}`}
          style={{
            borderRadius: 7.5,
            backgroundColor: CategoryConfigs.find((config) => config.category === category)?.color,
          }}></View>
        <Text style={{ fontSize: 20 }} className="">
          {label}
        </Text>
      </View>
      {isActive ? <ActiveCircle /> : <InactiveCircle />}
    </TouchableOpacity>
  );
};

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

export default ModalProvider;
