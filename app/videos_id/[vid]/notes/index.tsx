import { View, Text, TouchableOpacity, ColorValue } from 'react-native';
import React, { useState } from 'react';
import MyTextInput from 'components/MyTextInput';

import Ionicons from '@expo/vector-icons/Ionicons';
import CollapsibleShell from 'components/CollapsibleShell';
import Avatar from 'components/Avatar';

const PLACEHOLDER =
  '尊敬的各位来宾，女士们、先生们，大家上午好，尊敬的各位来宾，女士们、先生们，大家上午好......';

interface NoteNodeProps {
  timestamp?: string;
  content?: string;
  speaker?: string;
  color?: ColorValue;
}

const NoteNode = ({
  timestamp = '00:00:46',
  content = PLACEHOLDER,
  speaker = '发言人',
  color,
}: NoteNodeProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <View className="flex-1 flex-row gap-2 py-2">
      <TouchableOpacity onPress={() => setChecked(!checked)}>
        <Ionicons size={20} name={`checkmark-circle${checked ? '' : '-outline'}`} color={color} />
      </TouchableOpacity>
      <Text className="text-lg font-medium">{timestamp}</Text>
      <View className="flex-1 gap-2">
        <Text className="text-lg text-gray-text">{content}</Text>
        <View className="flex-row items-center gap-2">
          <Avatar />
          <Text className="text-base">{speaker}</Text>
        </View>
      </View>
    </View>
  );
};

const CategorizedView = () => {
  return (
    <View className="gap-4">
      <MyTextInput
        icon={<Ionicons size={18} name="search-outline" color="#8b8b8b" />}
        placeholder="搜索标记内容"
      />
      <CollapsibleShell
        withPadding={false}
        label="重点内容"
        labelClassName="text-black"
        dotColor="#F66348"
        toggle="top">
        <View className="flex-1 gap-2 pt-1" style={{ borderTopWidth: 1, borderColor: '#1556F010' }}>
          <NoteNode color="#F66348" />
          <NoteNode color="#F66348" />
        </View>
      </CollapsibleShell>
      <CollapsibleShell
        withPadding={false}
        label="疑惑内容"
        labelClassName="text-black"
        dotColor="#00BBFF"
        toggle="top">
        <View className="flex-1 gap-2 pt-1" style={{ borderTopWidth: 1, borderColor: '#1556F010' }}>
          <NoteNode color="#00BBFF" />
          <NoteNode color="#00BBFF" />
        </View>
      </CollapsibleShell>
      <CollapsibleShell
        withPadding={false}
        label="代办内容"
        labelClassName="text-black"
        dotColor="#FFD84E"
        toggle="top">
        <View className="flex-1 gap-2 pt-1" style={{ borderTopWidth: 1, borderColor: '#1556F010' }}>
          <NoteNode color="#FFD84E" />
          <NoteNode color="#FFD84E" />
        </View>
      </CollapsibleShell>
    </View>
  );
};

export default CategorizedView;
