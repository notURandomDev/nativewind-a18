import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';

import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

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

export interface CustomContextMenuProps {
  onReset?: () => void;
  onMark?: () => void;
  onQuestion?: () => void;
}
const CustomContextMenu = ({ onReset, onMark, onQuestion }: CustomContextMenuProps) => (
  <View
    className="absolute bg-white"
    style={{
      right: 0,
      bottom: 0,
      boxShadow: '5px 2.5px 20px rgba(139,139,139,0.1)',
      borderRadius: 17,
      padding: 8,
    }}>
    <CustomContextMenuOption
      icon={<Ionicons size={20} name="close-circle-outline" />}
      label="删除标记"
      onPress={onReset || (() => console.log('no onReset cb was declared'))}
    />
    <CustomContextMenuOption
      icon={
        <Image
          style={{ aspectRatio: 1, width: 20 }}
          source={require('../assets/imgs/pencil-red.png')}
        />
      }
      label="修改为「重点」"
      onPress={onMark || (() => console.log('no onMark cb was declared'))}
    />
    <CustomContextMenuOption
      icon={
        <Image
          style={{ aspectRatio: 1, width: 20 }}
          source={require('../assets/imgs/pencil-blue.png')}
        />
      }
      label="修改为「疑惑」"
      onPress={onQuestion || (() => console.log('no onQuestion cb was declared'))}
    />
  </View>
);

export default CustomContextMenu;
