import { useEffect, useState } from 'react';
import { deleteAllNotes, getNotes, NoteProps } from 'storage/noteStorage';

const REFRESH_DELAY_MILLIS = 500;

const useNote = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const getNotesAsync = async () => {
    getNotes().then((res) => setNotes(res));
  };

  const deleteNotesAsync = async () => {
    await deleteAllNotes();
    setNotes([]);
  };

  const refreshNotes = () => setTimeout(getNotesAsync, REFRESH_DELAY_MILLIS);

  useEffect(() => {
    getNotesAsync();
  }, []);

  return { notes, getNotesAsync, deleteNotesAsync, refreshNotes };
};

export default useNote;
