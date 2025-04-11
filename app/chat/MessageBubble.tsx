import { Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { LocalChatMessageProps } from './messageTypes';

const USER = 0;
const AI = 1;

export const MessageBubble = (props: LocalChatMessageProps) => {
  const { text, sender } = props;
  return (
    <View className={`${sender === USER && 'justify-end'} flex-1 flex-row`}>
      <View
        className={`${sender === AI ? 'bg-white' : 'bg-blue'}`}
        style={{
          width: sender === AI ? '100%' : 'auto',
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: sender === USER ? 12 : 4,
          borderBottomRightRadius: sender === USER ? 4 : 12,
          paddingHorizontal: 16,
          paddingVertical: sender === AI ? 2 : 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
        <Markdown
          style={{
            body: {
              paddingVertical: 0,
              flex: 1,
              width: '100%',
              fontSize: 18,
              lineHeight: 28,
              fontWeight: 400,
              color: sender === USER ? '#ffffff' : '',
            },
            list_item: { marginBottom: 8 },
          }}>
          {text}
        </Markdown>
      </View>
    </View>
  );
};
