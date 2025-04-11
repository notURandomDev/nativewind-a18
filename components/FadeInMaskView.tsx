import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const FadeInMaskView = ({ delay = 1000 }: { delay?: number }) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(0, { duration: delay });
  }, []);

  return (
    <Animated.View
      style={[{ bottom: 0, top: 0, left: 0, right: 0, zIndex: 1, borderRadius: 17 }, animatedStyle]}
      className="absolute bg-white"
    />
  );
};

export default FadeInMaskView;
