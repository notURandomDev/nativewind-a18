import { Ref } from 'react';
import { TextInput } from 'react-native';

export interface Reference4MeetingProps {
  meetingId: string;
  title: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface Reference4TranscriptionProps {
  sentenceId: number;
  startTime: number;
  endTime: number;
  text: string;
}

export interface AgentResponseDataProps {
  text?: string;
  message_id: string;
  timestamp: number;
  reference?: Array<Reference4MeetingProps>;
}

export interface AgentResponseProps {
  type: 'answer' | 'reference';
  data: AgentResponseDataProps;
  timestamp: number;
  _final: boolean;
}

export interface TestResponseProps {
  testing: boolean;
  sse_dev: string;
  msg: string;
  now: number;
}

export interface LocalMessageProps {
  id?: number;
  text: string;
  sender: number;
}

export interface BottomToolBoxProps {
  textInputRef: Ref<TextInput>;
  onSubmit: (textinput: string) => void;
  onKeyboardToggle: () => void;
}
