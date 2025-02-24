import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const CustomVideoView = ({ videoSource }) => {
  const { width: screenWidth } = Dimensions.get('window');
  const videoHeight = screenWidth * (9 / 16);

  const [videoControlsVisible, setVideoControlsVisible] = useState(false);
  const hideTimeoutRef = useRef(null);
  const opacity = useSharedValue(0);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    // player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const showControls = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current); // Clear any existing timeout
    }

    setVideoControlsVisible(true);
    opacity.value = withTiming(1, { duration: 300 });

    // 5 秒后自动隐藏
    hideTimeoutRef.current = setTimeout(() => runOnJS(hideControls)(), 5000);
  };

  const hideControls = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current); // Clear the timeout manually
      hideTimeoutRef.current = null;
    }

    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setVideoControlsVisible)(false);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        videoControlsVisible ? hideControls() : showControls();
      }}>
      <View className="relative w-full">
        <VideoView
          style={{
            width: '100%',
            height: videoHeight,
          }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="cover"
          nativeControls={false}
        />
        {videoControlsVisible && (
          <Animated.View
            className="absolute left-0 top-0"
            style={[animatedStyle, { width: screenWidth, height: videoHeight }]}>
            <View className="bg-red" style={{ height: videoHeight / 2 }}></View>
            <View className="bg-red" style={{ height: videoHeight / 2 }}></View>
            {/* <LinearGradient
            colors={['rgba(31, 29, 43, 0.6)', 'rgba(31, 29, 43, 0)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0.1317, 0.5086]}
            style={{ height: videoHeight / 2 }}
          /> */}
            {/* <LinearGradient
            colors={['rgba(31, 29, 43, 0)', 'rgba(31, 29, 43, 0.6)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0.4617, 0.8924]}
            style={{ height: videoHeight / 2 }}
          /> */}
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomVideoView;
