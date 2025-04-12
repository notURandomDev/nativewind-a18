import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import React, { ReactNode, useState } from 'react';
import * as Haptics from 'expo-haptics';

import Ionicons from '@expo/vector-icons/Ionicons';
import { twMerge } from 'tailwind-merge';
import Collapsible from 'react-native-collapsible';

interface CustomToggleProps {
  show: ReactNode;
  collapse: ReactNode;
}

interface CollapsibleShellProps {
  children?: ReactNode;
  label?: string;
  labelClassName?: string;
  dotColor?: string;
  collaspeEnabled?: boolean;
  withPadding?: boolean;
  contentContainerStyle?: ViewStyle;
  toggle?: 'bottom' | 'top';
  transparent?: boolean;
  customLabel?: ReactNode;
  customToggle?: CustomToggleProps;
}

const CollapsibleShell = ({
  children,
  label,
  labelClassName,
  dotColor = '#1556F0',
  collaspeEnabled = true,
  withPadding = true,
  contentContainerStyle,
  toggle = 'bottom',
  transparent = false,
  customLabel,
  customToggle,
}: CollapsibleShellProps) => {
  const [collapsed, setCollapsed] = useState(!collaspeEnabled);

  const TopToggleIndicator = () => {
    if (customToggle) {
      return collapsed ? customToggle.show : customToggle.collapse;
    } else {
      return (
        <View className="flex-row items-center gap-1">
          <Text className="" style={{ color: '#c7c7c7' }}>
            {collapsed ? '展开' : '收起'}
          </Text>
          {collapsed ? (
            <Ionicons size={16} name="chevron-down" color="#c7c7c7" />
          ) : (
            <Ionicons size={16} name="chevron-up" color="#c7c7c7" />
          )}
        </View>
      );
    }
  };

  return (
    <View
      className={`${!transparent && 'bg-blue-faint'} ${toggle === 'bottom' && 'gap-4'}`}
      style={{ flexGrow: 1, borderRadius: 17, paddingHorizontal: 16, paddingVertical: 20 }}>
      <TouchableOpacity
        activeOpacity={1}
        className="flex-row items-center justify-between"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setCollapsed(!collapsed);
        }}>
        {customLabel ?? (
          <View className="flex-row items-center gap-2">
            <Ionicons name="ellipse" size={14} color={dotColor} />
            <Text
              style={{ fontSize: 22 }}
              className={twMerge('font-semibold text-blue', labelClassName)}>
              {label}
            </Text>
          </View>
        )}
        {toggle === 'top' && <TopToggleIndicator />}
      </TouchableOpacity>

      <Collapsible
        collapsedHeight={toggle === 'bottom' ? 125 : 0}
        style={[
          {
            paddingTop: 12,
            flexGrow: 1,
            borderRadius: 10,
          },
          withPadding && { paddingHorizontal: 16, paddingVertical: 12 },
          ...(contentContainerStyle ? [contentContainerStyle] : []),
        ]}
        collapsed={collapsed}>
        {children}
      </Collapsible>

      {collaspeEnabled && toggle === 'bottom' && (
        <TouchableOpacity className="items-center" onPress={() => setCollapsed(!collapsed)}>
          <Text className="" style={{ color: '#c7c7c7' }}>
            {collapsed ? '—— 查看全部 ——' : '—— 收起 ——'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CollapsibleShell;
