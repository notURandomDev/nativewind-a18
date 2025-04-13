import { View, ScrollView } from 'react-native';
import React from 'react';
import MyTextInput from 'components/MyTextInput';
import { NoteItem } from 'components/NoteItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import TouchableIcon from 'components/TouchableIcon';
import useNote from 'hooks/useNote';
import NewNoteBtn from 'components/NewNoteBtn';

const MyNotes = () => {
  const { notes, getNotesAsync, deleteNotesAsync, refreshNotes } = useNote();

  return (
    <View className="flex-1" style={{ paddingTop: 16 }}>
      <View className="flex-row items-center gap-4 px-4">
        <TouchableIcon onPress={getNotesAsync}>
          <Ionicons size={24} name="refresh-outline" />
        </TouchableIcon>
        <View className="flex-1">
          <MyTextInput placeholder="搜索笔记内容" size="sm" />
        </View>
        <TouchableIcon onPress={deleteNotesAsync}>
          <Ionicons color="red" size={24} name="trash-outline" />
        </TouchableIcon>
      </View>
      <ScrollView contentContainerClassName="gap-4 px-4" className="relative py-5">
        {notes.map(({ title, content, date, category, id }) => {
          return (
            <NoteItem
              id={id}
              key={`note-${id}`}
              date={date}
              preview={content}
              title={title}
              category={category}
              onDelete={refreshNotes}
              onCategorize={refreshNotes}
              onPin={refreshNotes}
            />
          );
        })}
      </ScrollView>
      <NewNoteBtn />
    </View>
  );
};

export default MyNotes;
