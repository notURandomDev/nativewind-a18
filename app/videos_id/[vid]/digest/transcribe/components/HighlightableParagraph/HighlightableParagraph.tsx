import { ReactNode, useEffect, useState } from 'react';
import { HighlightableParagraphProps } from './types';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ParagraphHighlightConfig } from './constants';
import CustomContextMenu, { CustomContextMenuCbProps } from 'components/ContextMenu';
import { Alert, DeviceEventEmitter, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Haptics from 'expo-haptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatTime } from 'utils/formatTime';
import segmentSentence from '../../utils/segmentSentence';

const HighlightableParagraph = ({
  sentence,
  type,
  noteTag = 'none',
  modifyNoteTagCb,
}: HighlightableParagraphProps) => {
  console.log(`para-${sentence.index}-rendered`);

  const [isActive, setIsActive] = useState(false);

  const borderColor = useSharedValue('#ffffff');
  const scaleSize = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderWidth: 1,
      borderColor: borderColor.value,
      transform: [{ scale: scaleSize.value }],
    };
  });

  useEffect(() => {
    if (isActive) {
      borderColor.value = withTiming(ParagraphHighlightConfig[noteTag].borderColor.toString(), {
        duration: 100,
      });
    } else {
      borderColor.value = withTiming(
        noteTag === 'none' ? '#ffffff' : ParagraphHighlightConfig[noteTag].borderColor.toString(),
        { duration: 200 }
      );
    }
  }, [isActive]);

  const withActiveCb = (fn: () => void) => {
    fn();
    setIsActive(false);
  };

  const cbs: CustomContextMenuCbProps = {
    onMark: () => withActiveCb(() => modifyNoteTagCb(sentence.index, 'mark')),
    onQuestion: () => withActiveCb(() => modifyNoteTagCb(sentence.index, 'question')),
    onTodo: () => withActiveCb(() => modifyNoteTagCb(sentence.index, 'todo')),
    onReset: () => withActiveCb(() => modifyNoteTagCb(sentence.index, 'none')),
  };

  const handlePress = () => {
    if (isActive) setIsActive(false);
    DeviceEventEmitter.emit('seekVideo', sentence.beginTime);
    scaleSize.value = withTiming(0.95, { duration: 100 }, () => {
      scaleSize.value = withTiming(1, { duration: 100 });
    });
  };

  const handleLongPress = () => {
    setIsActive(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    console.log('on-long-press');
  };

  const SentenceWrapper = ({ children }: { children: ReactNode }) => (
    <TouchableOpacity
      className="relative gap-1"
      activeOpacity={1}
      onLongPress={handleLongPress}
      onPress={handlePress}>
      <View className="flex-row items-center gap-1 px-2">
        <Ionicons name="caret-forward-circle-outline" />
        <Text className="text-xl">
          {formatTime(Math.round(sentence.beginTime ? sentence.beginTime / 1000 : 0))}
        </Text>
      </View>
      <Animated.View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 10,
            boxShadow: ParagraphHighlightConfig[noteTag].boxShadow,
          },
          animatedStyle,
          { backgroundColor: ParagraphHighlightConfig[noteTag].backgroundColor },
        ]}
        className="bg-white">
        {children}
        {isActive && <CustomContextMenu cbs={cbs} currentTag={noteTag} />}
      </Animated.View>
    </TouchableOpacity>
  );

  const hasTerms = sentence?.card && JSON.parse(sentence.card)['terms'].length;
  // 如果是未增强过的转录数据，或增强过的转录数据中知识卡片数组为空，就直接将原句返回
  if (type === 'raw' || !hasTerms) {
    return (
      <SentenceWrapper>
        <Animated.Text className="font-light" style={styles.paragragh}>
          <Text>{sentence.text}</Text>
        </Animated.Text>
      </SentenceWrapper>
    );
  }

  // 如果调用了该函数，则代表句子中一定有知识卡片，需要进行分割
  const segmentedSentence = segmentSentence(sentence);
  // 对切片数组进行遍历
  // 通过判断是不是知识卡片，返回相应的样式
  const ReassembledSentence = () => (
    <Animated.Text className="font-light" style={styles.paragragh}>
      {segmentedSentence.map((segment) =>
        segment.isTerm ? (
          <Text
            key={segment.segmentId}
            suppressHighlighting={true}
            onPress={() => {
              Alert.alert(segment.text, segment.explanation);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            className="text-blue">
            {segment.text}
          </Text>
        ) : (
          <Text key={segment.segmentId}>{segment.text}</Text>
        )
      )}
    </Animated.Text>
  );

  return (
    <SentenceWrapper>
      <ReassembledSentence />
    </SentenceWrapper>
  );
};

const styles = StyleSheet.create({
  paragragh: { lineHeight: 28, fontSize: 17 },
});

export default HighlightableParagraph;
