import { View } from 'react-native';
import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import { NoteItem } from 'components/NoteItem';
import useNote from 'hooks/useNote';
import NewNoteBtn from 'components/NewNoteBtn';

const MyNotesView = () => {
  const { notes, refreshNotes } = useNote();

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerClassName="gap-4 px-8"
        style={{ height: 310 }}
        contentContainerStyle={{ flexGrow: 1, display: 'flex', paddingVertical: 12 }}>
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

export default MyNotesView;
