export interface KnowledgeDataProps {
  term: string;
  explanation: string;
  positions: Array<Array<number>>;
}

export interface SentenceProps {
  beginTime?: number;
  text: string;
  index: number;
  taskKey: string;
  card?: string;
}

export interface SentenceSegmentProps {
  segmentId: string;
  text: string;
  isTerm: boolean;
  explanation?: string;
}

export type NoteTags = 'none' | 'question' | 'todo' | 'mark';

export interface TranscriptionProps {
  _final: boolean;
  data: SentenceProps;
  timestamp: bigint;
  type: 'raw' | 'enhanced' | 'missedEnhanced';
  noteTag: NoteTags;
}
