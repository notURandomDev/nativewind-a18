import { Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { LocalChatMessageProps } from './messageTypes';

const USER = 0;
const AI = 1;

export const MessageBubble = (props: LocalChatMessageProps) => {
  const { text, sender } = props;
  return (
    <View className={`${sender === USER && 'justify-end'} flex-row `}>
      <View
        className={`${sender === AI ? 'bg-white' : 'bg-blue'}`}
        style={{
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: sender === USER ? 12 : 0,
          borderBottomRightRadius: sender === USER ? 0 : 12,
          paddingHorizontal: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
        <Markdown
          style={{
            body: {
              flex: 1,
              fontSize: 20,
              lineHeight: 32,
              fontWeight: 300,
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
