import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import {
  CheckMarkBadge,
  CheckMarkProgress,
  CheckMarkSuccess,
  CheckMarkYes,
  LoadingCircle,
} from 'assets/animations';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export type PhaseCodeTypes = -1 | 4 | 8 | 9 | 10 | 15 | 16;
type IndicatorNameTypes =
  | 'check-mark-yes'
  | 'check-mark-success'
  | 'check-mark-progress'
  | 'check-mark-badge'
  | 'loading-circle';

const PhaseMap = new Map<PhaseCodeTypes, string>([
  [-1, '未知阶段'],
  [4, '问题安全检测阶段'],
  [8, '回答安全检测阶段'],
  [9, '会议外资料筛选与思考'],
  [10, '会议内资料筛选与思考'],
  [15, '意图识别阶段'],
  [16, '普通回答思考'],
]);

const IndicatorMap = new Map<IndicatorNameTypes, any>([
  ['check-mark-yes', CheckMarkYes],
  ['check-mark-success', CheckMarkSuccess],
  ['check-mark-progress', CheckMarkProgress],
  ['check-mark-badge', CheckMarkBadge],
  ['loading-circle', LoadingCircle],
]);

interface PhaseIndicatorProps {
  phaseCode: PhaseCodeTypes;
  size?: number;
  loading?: boolean;
}
const PhaseIndicator = ({ phaseCode, size = 20, loading = true }: PhaseIndicatorProps) => {
  const lottieRef = useRef<LottieView>(null);

  // 动画值
  // const translateX = useSharedValue(-100); // 初始位置在左侧
  const onPendingOpacity = useSharedValue(1);

  const onCompleteOpacity = useSharedValue(0);
  const onCompleteTranslateX = useSharedValue(0);

  // 动画样式

  const onPendingAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: onPendingOpacity.value };
  });

  const onCompleteAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: onCompleteOpacity.value,
      transform: [{ translateX: onCompleteTranslateX.value }],
    };
  });

  // 当 loading 变化时触发动画
  useEffect(() => {
    if (!loading) {
      setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 1000);
      onCompleteTranslateX.value = withDelay(500, withTiming(-43, { duration: 500 })); // 滑动到 0
      onCompleteOpacity.value = withDelay(500, withTiming(1, { duration: 500 })); // 渐显
      onPendingOpacity.value = withTiming(0, { duration: 500 }); // 渐隐
    }
  }, [loading]);

  return (
    <View className="flex-row items-center gap-2">
      <LottieView
        style={{ width: size, height: size }}
        autoPlay={true}
        loop={loading}
        source={loading ? IndicatorMap.get('loading-circle') : IndicatorMap.get('check-mark-badge')}
        ref={lottieRef}
      />

      <View className="flex-row items-center">
        <Text className="text-xl font-medium">{PhaseMap.get(phaseCode)}</Text>
        <Animated.Text className="text-xl font-medium" style={onPendingAnimatedStyle}>
          进行中
        </Animated.Text>
        <Animated.Text className="text-xl font-medium" style={onCompleteAnimatedStyle}>
          已完成
        </Animated.Text>
      </View>
    </View>
  );
};

export default PhaseIndicator;
