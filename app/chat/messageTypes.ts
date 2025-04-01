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
  reference?: Reference4MeetingProps[];
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

export interface LocalMessageBaseProps {
  type: 'chat' | 'ref-transcription' | 'ref-meeting';
  id: number;
}

enum SenderType {
  USER = 0,
  AI = 1,
}
export interface LocalChatMessageProps extends LocalMessageBaseProps {
  text: string;
  sender: SenderType;
}

export interface LocalMeetingRefMessageProps extends LocalMessageBaseProps {
  reference: Reference4MeetingProps;
}

export interface LocalTranscriptionRefMessageProps extends LocalMessageBaseProps {
  reference: Reference4TranscriptionProps;
}
