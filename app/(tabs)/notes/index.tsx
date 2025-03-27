import { View, Text, ScrollView, ColorValue } from 'react-native';
import React, { useRef } from 'react';
import MyTextInput from 'components/MyTextInput';
import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import CollapsibleShell from 'components/CollapsibleShell';
import { NoteItem, NoteNode } from 'components/NoteItem';
import Feather from '@expo/vector-icons/Feather';

const KEY_NOTES = [
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
];

const MARKED_NOTES = [
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
    category: 'PRIVATE',
  },
];

const PENDING_NOTES = [
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
    category: 'PRIVATE',
  },
  {
    id: 4,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'UNCATEGORIZED',
  },
  {
    id: 5,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'PRIVATE',
  },
  {
    id: 6,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'PRIVATE',
  },
];

interface LocalNoteItemProps {
  bgColor?: ColorValue;
}

const LocalNoteItem = ({ bgColor = '#FF3F3F10' }: LocalNoteItemProps) => (
  <View
    style={[
      {
        position: 'relative',
        borderRadius: 17,
        backgroundColor: bgColor,
      },
    ]}
    className="gap-0.5 p-4">
    <Text className="text-xl font-medium">云计算与AI融合：共创数字智能新时代</Text>
    <View className="flex-row">
      <Text className="font-light text-gray-solid">2025年5月18日</Text>
      <Text>｜</Text>
      <Text className="font-light text-gray-solid">随着大语言模型与云的结合，技...</Text>
    </View>
  </View>
);

interface CategorizingLabelProps {
  label?: string;
  accentColor?: string;
  sublabel?: string;
}
const CategorizingLabel = ({
  label = '标题',
  accentColor = '#1556F0',
  sublabel = '副标题',
}: CategorizingLabelProps) => (
  <View className="flex-1 flex-row items-center justify-between gap-2" style={{ paddingRight: 12 }}>
    <View className="flex-row items-baseline gap-2">
      <View className="flex-row items-center gap-2">
        <Ionicons name="ellipse" size={16} color={accentColor} />
        <View className="relative">
          <View
            style={{ backgroundColor: accentColor, height: 8 }}
            className="absolute bottom-0 left-0 right-0 flex-1"></View>
          <Text className="text-3xl">{label}</Text>
        </View>
      </View>
      <Text className="text-base font-light text-gray" style={{ color: '#9F9F9F' }}>
        {sublabel}
      </Text>
    </View>
    <Feather name="filter" size={24} color="black" />
  </View>
);

const CategorizedNotes = () => {
  return (
    <View className="flex-1 py-4">
      <View className="px-4 text-blue">
        <MyTextInput placeholder="搜索标签内容" size="sm" />
      </View>
      <ScrollView contentContainerClassName="gap-0" className="py-3">
        <CollapsibleShell
          customToggle={{
            show: <Ionicons size={24} name="chevron-down" />,
            collapse: <Ionicons size={24} name="chevron-up" />,
          }}
          customLabel={
            <CategorizingLabel label="重点" sublabel="总计2个重点" accentColor="#F66348" />
          }
          contentContainerStyle={{ gap: 12 }}
          transparent
          withPadding={false}
          labelClassName="text-black"
          dotColor="#00BBFF"
          toggle="top">
          {KEY_NOTES.map((note) => (
            <LocalNoteItem />
          ))}
        </CollapsibleShell>
        <CollapsibleShell
          customToggle={{
            show: <Ionicons size={24} name="chevron-down" />,
            collapse: <Ionicons size={24} name="chevron-up" />,
          }}
          customLabel={
            <CategorizingLabel label="疑惑" sublabel="总计3个重点" accentColor="#00BBFF" />
          }
          contentContainerStyle={{ gap: 12 }}
          transparent
          withPadding={false}
          toggle="top">
          {MARKED_NOTES.map((note) => (
            <LocalNoteItem bgColor="#00BBFF10" />
          ))}
        </CollapsibleShell>
        <CollapsibleShell
          customToggle={{
            show: <Ionicons size={24} name="chevron-down" />,
            collapse: <Ionicons size={24} name="chevron-up" />,
          }}
          customLabel={
            <CategorizingLabel label="代办" sublabel="总计6个代办" accentColor="#FFD84E" />
          }
          contentContainerStyle={{ gap: 12 }}
          transparent
          withPadding={false}
          toggle="top">
          {PENDING_NOTES.map((note) => (
            <LocalNoteItem bgColor="#FFD84E10" />
          ))}
        </CollapsibleShell>
      </ScrollView>
    </View>
  );
};

export default CategorizedNotes;
