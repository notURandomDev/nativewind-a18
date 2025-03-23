import { View, Text, StyleSheet, TouchableOpacity, Modal, ColorValue } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import MyTextInput from 'components/MyTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonAllinOne from 'components/ButtonAllinOne';
import * as Haptics from 'expo-haptics';
import { TabPageLayout } from '../_layout';

interface RightActionProps {
  progress: SharedValue<number>;
  dragX: SharedValue<number>;
}

const RightAction: React.FC<{
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  openModal: () => void;
}> = ({ prog, drag, openModal }) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 228 }],
    };
  });

  return (
    <Reanimated.View
      className="flex-row items-center gap-4"
      style={[styleAnimation, { paddingHorizontal: 12 }]}>
      <ButtonAllinOne rounded="full" containerStyles="bg-blue-faint" variant="ghost">
        <Ionicons color="#1556F0" size={26} name="chevron-up" />
      </ButtonAllinOne>
      <ButtonAllinOne
        onPress={openModal}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="grid-outline" />
      </ButtonAllinOne>
      <ButtonAllinOne rounded="full" containerStyles="bg-blue-faint" variant="ghost">
        <Ionicons color="#1556F0" size={26} name="star-outline" />
      </ButtonAllinOne>
      <ButtonAllinOne rounded="full" containerStyles="bg-blue-faint" variant="ghost">
        <Ionicons color="#1556F0" size={26} name="close-circle-outline" />
      </ButtonAllinOne>
    </Reanimated.View>
  );
};

const NoteItem = ({ cb }: { cb: () => void }) => {
  return (
    <ReanimatedSwipeable
      overshootRight={false}
      childrenContainerStyle={{ flex: 1 }}
      friction={1}
      renderRightActions={(progress, dragX) => (
        <RightAction prog={progress} drag={dragX} openModal={cb} />
      )}>
      <View style={{ position: 'relative', borderRadius: 17 }} className="gap-0.5 p-4">
        <LinearGradient
          colors={['#E9E8FF', '#F5F8FF']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.55 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 17,
            padding: 12,
            flexGrow: 1,
          }}
        />
        <Text className="text-xl font-medium">云计算与AI融合：共创数字智能新时代</Text>
        <View className="flex-row">
          <Text className="font-light text-gray-solid">2025年5月18日</Text>
          <Text>｜</Text>
          <Text className="font-light text-gray-solid">随着大语言模型与云的结合，技...</Text>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
};

const NOTE_ITEMS = [
  {
    id: 1,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'PRIVATE',
  },
  {
    id: 1,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'PRIVATE',
  },
];

const MyNotesView = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(3);

  const handleNoteCreation = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsModalVisible(true);
  };

  return (
    <View className="relative justify-between">
      <TabPageLayout>
        <View className="gap-4">
          <MyTextInput
            icon={<Ionicons size={18} name="search-outline" color="#8b8b8b" />}
            placeholder="搜索笔记"
          />
          {NOTE_ITEMS.map(() => (
            <NoteItem cb={() => setIsModalVisible(true)} />
          ))}
        </View>
      </TabPageLayout>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleNoteCreation}
        style={{
          paddingVertical: 16,
          borderColor: '#1556F010',
          borderTopWidth: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        className=" flex-row items-center justify-center gap-1">
        <Ionicons name="add" size={24} />
        <Text className="text-2xl font-medium">新建笔记</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        style={{ margin: 0 }}
        onRequestClose={() => setIsModalVisible(false)}
        onDismiss={() => setIsModalVisible(false)}
        visible={isModalVisible}>
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
              <ButtonAllinOne onPress={() => setIsModalVisible(false)} variant="ghost">
                <Ionicons size={28} name="chevron-down" />
              </ButtonAllinOne>
            </View>
            <View>
              <Text style={{ fontSize: 28, paddingBottom: 20 }}>请选择分类</Text>
            </View>
            <View className="" style={{ gap: 26, paddingBottom: 20 }}>
              {CATEGORIES.map(({ label, category }, idx) => (
                <Category
                  key={`cat-${idx}`}
                  isActive={categoryIndex === idx}
                  label={label}
                  category={category}
                  pressCb={() => setCategoryIndex(idx)}
                />
              ))}
            </View>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              activeOpacity={1}
              className="items-center bg-blue-faint"
              style={{ paddingVertical: 16, borderRadius: 17 }}>
              <Text className="text-2xl font-medium text-blue">确认</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const COLORS = new Map([
  ['PRIVATE', '#00BBFF25'],
  ['WORK', '#FF4E7425'],
  ['MEETING', '#FFBB0025'],
  ['UNCATEGORIZED', '#8b8b8b'],
  ['NEW', '#c7c7c7'],
]);

const CATEGORIES = [
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
