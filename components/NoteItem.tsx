import { View, Text, ColorValue } from 'react-native';
import { useRef } from 'react';
import React from 'react';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonAllinOne from 'components/ButtonAllinOne';

const COLORS = new Map([
  ['DEFAULT', '#F5F8FF'],
  ['PRIVATE', '#00BBFF25'],
  ['WORK', '#FF4E7425'],
  ['MEETING', '#FFBB0025'],
  ['UNCATEGORIZED', '#8b8b8b'],
  ['NEW', '#c7c7c7'],
]);

interface RightActionProps {
  progress: SharedValue<number>;
  dragX: SharedValue<number>;
}

const RightAction: React.FC<{
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  openModal: () => void;
  closeSwipeableCb: () => void;
}> = ({ prog, drag, openModal, closeSwipeableCb }) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 228 }],
    };
  });

  const handleStar = () => {
    closeSwipeableCb();
  };

  const handleDelete = () => {
    closeSwipeableCb();
  };

  const handleCategorize = () => {
    openModal();
    setTimeout(closeSwipeableCb, 500);
  };

  const handlePin = () => {
    closeSwipeableCb();
  };

  return (
    <Reanimated.View
      className="flex-row items-center gap-4"
      style={[styleAnimation, { paddingHorizontal: 12 }]}>
      <ButtonAllinOne
        onPress={handlePin}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="chevron-up" />
      </ButtonAllinOne>
      <ButtonAllinOne
        onPress={handleCategorize}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="grid-outline" />
      </ButtonAllinOne>
      <ButtonAllinOne
        onPress={handleStar}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="star-outline" />
      </ButtonAllinOne>
      <ButtonAllinOne
        onPress={handleDelete}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="close-circle-outline" />
      </ButtonAllinOne>
    </Reanimated.View>
  );
};

interface NoteItemProps {
  category?: 'PRIVATE' | 'WORK' | 'MEETING' | 'NEW' | 'DEFAULT' | 'UNCATEGORIZED';
  updateSelectedNote?: () => void;
  cb?: () => void;
}

const NoteItem = ({ updateSelectedNote, cb, category = 'UNCATEGORIZED' }: NoteItemProps) => {
  const swipeableRef = useRef<SwipeableMethods>(null);

  const closeSwipeable = () => swipeableRef.current?.close();

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      onSwipeableOpen={updateSelectedNote}
      overshootRight={false}
      childrenContainerStyle={{ flex: 1 }}
      friction={1}
      renderRightActions={(progress, dragX) => (
        <RightAction
          closeSwipeableCb={closeSwipeable}
          prog={progress}
          drag={dragX}
          openModal={cb || (() => {})}
        />
      )}>
      <Reanimated.View
        style={[
          {
            position: 'relative',
            borderRadius: 17,
            backgroundColor: COLORS.get(category),
          },
        ]}
        className="gap-0.5 p-4">
        {category === 'UNCATEGORIZED' && (
          <LinearGradient
            colors={['#E9E8FF', '#F5F8FF']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.55 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 17,
              padding: 12,
              flexGrow: 1,
            }}
          />
        )}
        <Text className="text-xl font-medium">云计算与AI融合：共创数字智能新时代</Text>
        <View className="flex-row">
          <Text className="font-light text-gray-solid">2025年5月18日</Text>
          <Text>｜</Text>
          <Text className="font-light text-gray-solid">随着大语言模型与云的结合，技...</Text>
        </View>
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
};

export default NoteItem;
