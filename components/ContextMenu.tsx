import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { ReactNode, useMemo } from 'react';

import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { NoteTags } from 'app/videos_id/[vid]/digest/transcribe';

const CustomContextMenuOption = ({
  icon,
  label,
  onPress,
}: {
  icon: ReactNode;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress();
    }}
    style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 }}>
    {icon}
    <Text className="text-xl font-medium">{label}</Text>
  </TouchableOpacity>
);

export interface CustomContextMenuCbProps {
  onReset?: () => void;
  onMark?: () => void;
  onQuestion?: () => void;
  onTodo?: () => void;
}
export interface CustomContextMenuProps {
  cbs: CustomContextMenuCbProps;
  currentTag: NoteTags;
}

const CustomContextMenu = ({
  cbs: { onReset, onMark, onQuestion, onTodo },
  currentTag,
}: CustomContextMenuProps) => {
  const OptionsConfig = [
    { tag: 'mark', iconSrc: require('../assets/imgs/pencil-red.png'), label: '重点', cb: onMark },
    {
      tag: 'todo',
      iconSrc: require('../assets/imgs/pencil-yellow.png'),
      label: '代办',
      cb: onTodo,
    },
    {
      tag: 'question',
      iconSrc: require('../assets/imgs/pencil-blue.png'),
      label: '疑惑',
      cb: onQuestion,
    },
  ];

  const CustomContextMenuOptionsFactory = OptionsConfig.map(({ tag, iconSrc, label, cb }) => {
    if (currentTag !== tag) {
      return (
        <CustomContextMenuOption
          key={`option-${tag}`}
          icon={<Image style={{ aspectRatio: 1, width: 20 }} source={iconSrc} />}
          label={`${currentTag === 'none' ? '添加' : '修改'}为「${label}」`}
          onPress={cb || (() => console.log(`no on-${tag} cb was declared`))}
        />
      );
    }
  });

  return (
    <View
      className="absolute border border-blue bg-white"
      style={{
        right: 0,
        bottom: 0,
        boxShadow: '5px 2.5px 20px rgba(139,139,139,0.1)',
        borderRadius: 17,
        padding: 8,
      }}>
      {currentTag !== 'none' && (
        <CustomContextMenuOption
          icon={<Ionicons size={20} name="close-circle-outline" />}
          label="删除标记"
          onPress={onReset || (() => console.log('no onReset cb was declared'))}
        />
      )}
      {CustomContextMenuOptionsFactory}
    </View>
  );
};

export default CustomContextMenu;
