import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import MyTextInput from 'components/MyTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonAllinOne from 'components/ButtonAllinOne';
import * as Haptics from 'expo-haptics';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 228 }],
    };
  });

  return (
    <Reanimated.View
      className="flex-row items-center gap-4"
      style={[styleAnimation, { paddingHorizontal: 12 }]}>
      <ButtonAllinOne rounded="full" containerStyles="bg-blue-faint" variant="ghost">
        <Ionicons color="#1556F0" size={26} name="chevron-up" />
      </ButtonAllinOne>
      <ButtonAllinOne rounded="full" containerStyles="bg-blue-faint" variant="ghost">
        <Ionicons color="#1556F0" size={26} name="grid-outline" />
      </ButtonAllinOne>
      <ButtonAllinOne rounded="full" containerStyles="bg-blue-faint" variant="ghost">
        <Ionicons color="#1556F0" size={26} name="star-outline" />
      </ButtonAllinOne>
      <ButtonAllinOne rounded="full" containerStyles="bg-blue-faint" variant="ghost">
        <Ionicons color="#1556F0" size={26} name="close-circle-outline" />
      </ButtonAllinOne>
    </Reanimated.View>
  );
}

const NoteItem = () => {
  const handleSwipeOpen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  return (
    <ReanimatedSwipeable
      onSwipeableOpen={handleSwipeOpen}
      overshootRight={false}
      childrenContainerStyle={{ flex: 1 }}
      friction={1}
      renderRightActions={RightAction}>
      <View style={{ position: 'relative', borderRadius: 17 }} className="gap-0.5 p-4">
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
        <Text className="text-xl font-medium">云计算与AI融合：共创数字智能新时代</Text>
        <View className="flex-row">
          <Text className="font-light text-gray-solid">2025年5月18日</Text>
          <Text>｜</Text>
          <Text className="font-light text-gray-solid">随着大语言模型与云的结合，技...</Text>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
};

const MyNotesView = () => {
  return (
    <View className="gap-4">
      <MyTextInput
        icon={<Ionicons size={18} name="search-outline" color="#8b8b8b" />}
        placeholder="搜索笔记"
      />
      <NoteItem />
    </View>
  );
};

export default MyNotesView;
