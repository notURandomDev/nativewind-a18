import AsyncStorage from '@react-native-async-storage/async-storage';

const LOG_PREFIX = 'ASYNC-STORAGE:';

export type NoteCategory = 'personal' | 'work' | 'meeting' | 'default';

export type NoteProps = {
  title: string;
  content: string;
  id: string;
  category: NoteCategory;
  timestamp: number;
};

export const createNoteData = async (content: string, category: NoteCategory, title: string) => {
  const LOG_CONTENT = 'Creating Note Data';
  const timestamp = Date.now();
  const note: NoteProps = { content, id: `note-${timestamp}`, timestamp, category, title };
  try {
    await AsyncStorage.setItem(note.id, JSON.stringify(note));
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT, note);
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
  }
};

type GetNoteDataProps = () => Promise<NoteProps[] | []>;
export const getNoteData: GetNoteDataProps = async () => {
  const LOG_CONTENT = 'Getting Note Data';

  try {
    const noteIds = await AsyncStorage.getAllKeys().then((allKeys) =>
      allKeys.filter((key) => key.startsWith('note-', 0))
    );
    if (!noteIds.length) return [];

    const res = await Promise.all(
      noteIds.map(
        async (noteId) =>
          await AsyncStorage.getItem(noteId).then((note) => (note ? JSON.parse(note) : null))
      )
    );
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT, res);
    return res.filter((note): note is NoteProps => note !== null);
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
  }
};
