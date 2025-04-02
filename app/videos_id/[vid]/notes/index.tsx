import { View, Text, TouchableOpacity, ColorValue, ScrollView } from 'react-native';
import React, { useState } from 'react';
import MyTextInput from 'components/MyTextInput';

import Ionicons from '@expo/vector-icons/Ionicons';
import CollapsibleShell from 'components/CollapsibleShell';
import Avatar from 'components/Avatar';
import { TabPageLayout } from '../_layout';
import { NoteNode } from 'components/NoteItem';

const PLACEHOLDER =
  '尊敬的各位来宾，女士们、先生们，大家上午好，尊敬的各位来宾，女士们、先生们，大家上午好......';

const CategorizedView = () => {
  return (
    <TabPageLayout>
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
          <View
            className="flex-1 gap-2 pt-1"
            style={{ borderTopWidth: 1, borderColor: '#1556F010' }}>
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
          <View
            className="flex-1 gap-2 pt-1"
            style={{ borderTopWidth: 1, borderColor: '#1556F010' }}>
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
          <View
            className="flex-1 gap-2 pt-1"
            style={{ borderTopWidth: 1, borderColor: '#1556F010' }}>
            <NoteNode color="#FFD84E" />
            <NoteNode color="#FFD84E" />
          </View>
        </CollapsibleShell>
      </View>
    </TabPageLayout>
  );
};

export default CategorizedView;
