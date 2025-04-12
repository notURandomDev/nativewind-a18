import { NoteTags, SentenceProps } from '../../types';

export interface ModifyNoteTagCbProps {
  (index: number, newNoteTag: NoteTags): void;
}

export interface HighlightableParagraphProps {
  sentence: SentenceProps;
  type: 'enhanced' | 'raw' | 'missedEnhanced';
  noteTag: NoteTags;
  modifyNoteTagCb: ModifyNoteTagCbProps;
}
