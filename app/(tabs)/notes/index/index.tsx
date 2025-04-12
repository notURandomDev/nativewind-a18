import { View, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import MyTextInput from 'components/MyTextInput';
import { Ionicons } from '@expo/vector-icons';
import CollapsibleShell from 'components/CollapsibleShell';
import { KEY_NOTES, MARKED_NOTES, PENDING_NOTES } from './constants';
import CategorizingLabel from './components/CategorizingLabel/CategorizingLabel';
import LocalNoteItem from './components/LocalNoteItem/LocalNoteItem';

const CategorizedNotes = () => {
  const scrollviewRef = useRef<ScrollView>(null);

  return (
    <View className="flex-1 py-4">
      <View className="px-4 text-blue">
        <MyTextInput placeholder="搜索标签内容" size="sm" />
      </View>
      <ScrollView
        onContentSizeChange={() => scrollviewRef.current?.scrollToEnd({ animated: true })}
        ref={scrollviewRef}
        contentContainerClassName="gap-0"
        className="py-3">
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
          {KEY_NOTES.map((note, index) => (
            <LocalNoteItem {...note} key={`note-marked-${index}`} />
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
          {MARKED_NOTES.map((note, index) => (
            <LocalNoteItem {...note} key={`note-question-${index}`} bgColor="#00BBFF10" />
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
          {PENDING_NOTES.map((note, index) => (
            <LocalNoteItem {...note} key={`note-todo-${index}`} bgColor="#FFD84E10" />
          ))}
        </CollapsibleShell>
      </ScrollView>
    </View>
  );
};

export default CategorizedNotes;
