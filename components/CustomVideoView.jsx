import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent, useEventListener } from 'expo';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import TouchableIcon from './TouchableIcon';
import { Slider } from '@miblanchard/react-native-slider';
import * as ScreenOrientation from 'expo-screen-orientation';

const defaultVideoSource =
  'https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-f696-4ff2-9c76-e8ed9cdffe0f/604a87fc-e7bc-463e-8d56-cde7e661d690.mp4';

const CustomVideoView = ({ videoSource = defaultVideoSource, views = 1950 }) => {
  const { width: screenWidth } = Dimensions.get('window');
  const videoHeight = screenWidth * (3 / 5);

  const [videoControlsVisible, setVideoControlsVisible] = useState(true);
  const [seekbarPosition, setSeekbarPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const videoViewRef = useRef(null);

  const opacity = useSharedValue(0);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.timeUpdateEventInterval = 1;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { status } = useEvent(player, 'statusChange', { status: player.status });

  useEventListener(player, 'timeUpdate', ({ currentTime }) => {
    setSeekbarPosition(currentTime);
  });

  useEffect(() => {
    if (status === 'readyToPlay') {
      setVideoDuration(player.duration);
      player.play();
    }
  }, [status]);

  const showControls = () => {
    setVideoControlsVisible(true);
    opacity.value = withTiming(1, { duration: 300 });
  };

  const hideControls = () => {
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setVideoControlsVisible)(false);
    });
  };

  // Function to format time from seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value) => {
    const seekPosition = Math.round(value);
    setSeekbarPosition(seekPosition);
  };

  const handleSeekComplete = (value) => {
    const seekCompletePosition = Math.round(value);
    player.currentTime = seekCompletePosition;
  };

  const handleEnterFullscreen = async () => {
    // videoViewRef.current.enterFullscreen();
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
          nativeControls={false}
          contentFit="cover"
        />
        {videoControlsVisible && (
          <Animated.View
            className="absolute left-0 top-0"
            style={[animatedStyle, { width: screenWidth, height: videoHeight }]}>
            <LinearGradient
              colors={['rgba(31, 29, 43, 0.6)', 'rgba(31, 29, 43, 0)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              locations={[0.1317, 0.5086]}
              style={{ height: videoHeight / 2 }}>
              <View
                accessibilityLabel="top-controls"
                className="mt-12 flex-row justify-between p-5">
                <View
                  accessibilityLabel="top-left-controls"
                  className="flex-row items-center gap-4">
                  <TouchableIcon>
                    <Ionicons name="chevron-back-outline" size={24} color="#ffffff" />
                  </TouchableIcon>
                  <View className="flex-row items-center gap-1.5">
                    <Ionicons name="eye-outline" size={16} color="#ffffff" />
                    <Text className="text-white">{views}人次</Text>
                  </View>
                </View>
                <View
                  accessibilityLabel="top-right-controls"
                  className="flex-row items-center gap-8">
                  <TouchableIcon>
                    <Ionicons name="resize-outline" size={22} color="#ffffff" />
                  </TouchableIcon>
                  <TouchableIcon>
                    <Ionicons name="settings-outline" size={22} color="#ffffff" />
                  </TouchableIcon>
                  <TouchableIcon>
                    <Ionicons name="ellipsis-vertical" size={22} color="#ffffff" />
                  </TouchableIcon>
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['rgba(31, 29, 43, 0)', 'rgba(31, 29, 43, 0.6)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              locations={[0.4617, 0.8924]}
              style={{ height: videoHeight / 2, justifyContent: 'flex-end' }}>
              <View
                accessibilityLabel="bottom-controls"
                className="flex-row items-center justify-center gap-3 p-5">
                <TouchableIcon
                  onPress={() => {
                    isPlaying ? player.pause() : player.play();
                  }}>
                  {isPlaying ? (
                    <Ionicons name="pause-outline" size={28} color="#ffffff" />
                  ) : (
                    <Ionicons name="play-outline" size={28} color="#ffffff" />
                  )}
                </TouchableIcon>
                <View className="flex-1 ">
                  <Slider
                    value={seekbarPosition}
                    onSlidingComplete={handleSeekComplete}
                    onValueChange={handleSeek}
                    minimumValue={0}
                    maximumValue={videoDuration || 1}
                    minimumTrackTintColor="#00BBFF"
                    maximumTrackTintColor="#ffffff75"
                    thumbTintColor="#ffffff65"
                    renderTrackMarkComponent={() => {
                      <Text>asdf</Text>;
                    }}
                    ref={videoViewRef}
                  />
                </View>
                <View className="w-28 flex-row items-center">
                  <Text className="w-14 text-right text-sm text-white">
                    {formatTime(seekbarPosition)}
                  </Text>
                  <Text className="text-sm text-white">/</Text>
                  <Text className="w-14  text-sm text-white">{formatTime(videoDuration)}</Text>
                </View>
                <TouchableIcon onPress={handleEnterFullscreen}>
                  <Ionicons name="scan-outline" size={24} color="#ffffff" />
                </TouchableIcon>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomVideoView;
