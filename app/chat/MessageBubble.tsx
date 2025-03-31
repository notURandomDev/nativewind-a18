import { Text, View } from 'react-native';
import { LocalMessageProps } from './types';
import Markdown from 'react-native-markdown-display';

const USER = 0;
const AI = 1;

export const MessageBubble = ({ text, sender }: LocalMessageProps) => (
  <View className={`${sender === USER && 'justify-end'} flex-row `}>
    <View
      className={`${sender === AI ? 'bg-blue-faint' : ''}`}
      style={{
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: sender === USER ? 12 : 0,
        borderBottomRightRadius: sender === USER ? 0 : 12,
        paddingHorizontal: 16,
        paddingTop: sender === AI ? 12 : 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
      {sender === AI && (
        <View>
          <Text className="text-xl font-semibold text-blue">安小恒</Text>
        </View>
      )}
      <Markdown
        style={{
          body: {
            flex: 1,
            fontSize: 20,
            lineHeight: 32,
            fontWeight: 300,
          },
          list_item: { marginBottom: 8 },
        }}>
        {text}
      </Markdown>
    </View>
  </View>
);
