import { View } from 'react-native';
import { LocalMessageProps } from './types';
import Markdown from 'react-native-markdown-display';

const USER = 0;
const AI = 1;

export const MessageBubble = ({ text, sender }: LocalMessageProps) => (
  <View className={`${sender === USER && 'justify-end'} flex-row `}>
    <View
      style={{
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: sender === USER ? 12 : 0,
        borderBottomRightRadius: sender === USER ? 0 : 12,
        paddingHorizontal: 16,
        paddingVertical: 0,
      }}
      className={sender === USER ? 'flex-col-reverse bg-blue' : 'bg-blue-faint'}>
      <Markdown
        style={{
          body: {
            flex: 1,
            fontSize: 20,
            lineHeight: 32,
            color: sender === USER ? '#ffffff' : '#000000',
            fontWeight: sender === USER ? 300 : 400,
          },
          list_item: { marginBottom: 8 },
        }}>
        {text}
      </Markdown>
    </View>
  </View>
);
