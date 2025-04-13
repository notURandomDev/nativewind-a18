import AsyncStorage from '@react-native-async-storage/async-storage';
import { Terminal } from 'utils/terminalLog';
import { timestampConverter } from 'utils/timestampConverter';

const LOG_PREFIX = 'ASYNC-STORAGE:';

export type NoteCategory = 'personal' | 'work' | 'meeting' | 'default';

export type NoteProps = {
  title: string;
  content: string;
  id: string;
  category: NoteCategory;
  timestamp: number;
  date: string;
};

const terminal = Terminal(LOG_PREFIX);

export const createNote = async (content: string, category: NoteCategory, title: string) => {
  const LOG_CONTENT = 'Creating Note';
  const timestamp = Date.now();
  const { year, month, day, hour, minute } = timestampConverter(timestamp);
  const date = `${year}年${month}月${day}日 ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  const note: NoteProps = { content, id: `note-${timestamp}`, timestamp, category, title, date };
  try {
    await AsyncStorage.setItem(note.id, JSON.stringify(note));
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT, note);
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
  }
};

export const updateNote = async (noteId: string, newTitle: string, newContent: string) => {
  const LOG_CONTENT = 'Updating Note for ' + noteId;
  try {
    const oldNote: NoteProps | undefined = await getNote(noteId);
    if (oldNote) {
      const newNote: NoteProps = {
        ...oldNote,
        title: newTitle,
        content: newContent,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(noteId, JSON.stringify(newNote));
      terminal.success(LOG_CONTENT);
    }
  } catch (e) {
    terminal.error(LOG_CONTENT, e);
  }
};

export const updateNoteCategory = async (noteId: string, newCategory: NoteCategory) => {
  const LOG_CONTENT = 'Updating Note Category for' + noteId;
  try {
    const oldNote: NoteProps = await AsyncStorage.getItem(noteId).then(
      (note) => note && JSON.parse(note)
    );
    const newNote = { ...oldNote, category: newCategory };
    await AsyncStorage.setItem(noteId, JSON.stringify(newNote));
    terminal.success(LOG_CONTENT);
  } catch (e) {
    terminal.error(LOG_CONTENT, e);
  }
};

export const updateNoteTimestamp = async (noteId: string) => {
  const LOG_CONTENT = 'Updating Note Timestamp for ' + noteId;
  try {
    const oldNote: NoteProps = await AsyncStorage.getItem(noteId).then(
      (note) => note && JSON.parse(note)
    );
    const newNote = { ...oldNote, timestamp: Date.now() };
    await AsyncStorage.setItem(noteId, JSON.stringify(newNote));
    terminal.success(LOG_CONTENT);
  } catch (e) {
    terminal.error(LOG_CONTENT, e);
  }
};

const getNoteIds: () => Promise<string[] | []> = async () => {
  const LOG_CONTENT = 'Getting Note Keys';
  try {
    let noteIds: string[] = [];
    const noteKeys = await AsyncStorage.getAllKeys();
    if (noteKeys.length) noteIds = noteKeys.filter((key) => key.startsWith('note-', 0));
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT, noteIds);
    return noteIds;
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
    return [];
  }
};

type GetNoteDataProps = () => Promise<NoteProps[] | []>;
export const getNotes: GetNoteDataProps = async () => {
  const LOG_CONTENT = ' Getting Notes';

  try {
    const noteIds = await getNoteIds();
    if (!noteIds.length) return [];

    const notes = await Promise.all(
      noteIds.map(
        async (noteId) =>
          await AsyncStorage.getItem(noteId).then((note) => (note ? JSON.parse(note) : null))
      )
    );
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT, notes);
    return notes
      .filter((note): note is NoteProps => note !== null)
      .sort((noteA, noteB) => noteB.timestamp - noteA.timestamp);
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
    return [];
  }
};

export const getNote = async (noteId: string): Promise<NoteProps | undefined> => {
  const LOG_CONTENT = ' Getting Note for ' + noteId;
  try {
    const note: NoteProps = await AsyncStorage.getItem(noteId).then(
      (res) => res && JSON.parse(res)
    );
    terminal.success(LOG_CONTENT);
    return note;
  } catch (e) {
    terminal.error(LOG_CONTENT, e);
  }
};

export const deleteNote = async (noteId: string) => {
  const LOG_CONTENT = ' Deleting Note for ' + noteId;
  try {
    await AsyncStorage.removeItem(noteId);
    terminal.success(LOG_CONTENT);
  } catch (e) {
    terminal.error(LOG_CONTENT, e);
  }
};

export const deleteAllNotes = async () => {
  const LOG_CONTENT = ' Deleting Notes';
  const noteIds = await getNoteIds();
  try {
    await Promise.all(
      noteIds.map(async (noteId) => {
        await AsyncStorage.removeItem(noteId);
      })
    );
    console.log(LOG_PREFIX + 'Success' + LOG_CONTENT);
  } catch (e) {
    console.error(LOG_PREFIX + 'Error' + LOG_CONTENT, e);
  }
};
