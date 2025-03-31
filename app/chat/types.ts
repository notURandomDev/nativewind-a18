import { Ref } from 'react';
import { TextInput } from 'react-native';

export interface BottomToolBoxProps {
  textInputRef: Ref<TextInput>;
  onSubmit: (textinput: string) => void;
  onKeyboardToggle: () => void;
  onDeleteChat: () => void;
  onDisconnectSSE: () => void;
  sseLinkState: boolean;
}
