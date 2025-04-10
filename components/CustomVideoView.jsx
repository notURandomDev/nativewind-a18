import { View, Text, DeviceEventEmitter, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent, useEventListener } from 'expo';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import TouchableIcon from './TouchableIcon';
import { Slider } from '@miblanchard/react-native-slider';
import ClosedCaptionData from '../test/raw_output.json';
import * as Haptics from 'expo-haptics';
import { formatTime } from 'utils/formatTime';

// const defaultVideoSource = 'https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-f696-4ff2-9c76-e8ed9cdffe0f/604a87fc-e7bc-463e-8d56-cde7e661d690.mp4';
const defaultVideoSource = require('../assets/videos/final_test_video.mp4');

const CustomVideoView = ({ videoSource = defaultVideoSource, views = 1950 }) => {
  const { width: screenWidth } = Dimensions.get('window');
  const videoHeight = 220;

  const [videoControlsVisible, setVideoControlsVisible] = useState(true);
  const [seekbarPosition, setSeekbarPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [closedCaption, setClosedCaption] = useState({ text: '', sentenceId: -1 });
  const [ccVisible, setccVisible] = useState(false);

  const videoViewRef = useRef(null);

  const player = useVideoPlayer({ assetId: videoSource }, (player) => {
    player.loop = true;
    player.timeUpdateEventInterval = 1;
    player.muted = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { status } = useEvent(player, 'statusChange', { status: player.status });

  const setSeekbarOnTimeUpdate = (currentTime) => setSeekbarPosition(currentTime);
  const setClosedCaptionsOnTimeUpdate = (currentTime) => {
    const roundedTime = Math.round(currentTime * 1000);
    const sentence = ClosedCaptionData.filter(({ startTime, endTime }) => {
      return startTime < roundedTime && endTime > roundedTime;
    })[0];

    if (closedCaption.sentenceId !== sentence?.sentenceId)
      setClosedCaption({ text: sentence?.text, sentenceId: sentence?.sentenceId });
    // console.log(currentClosedCaption);
  };

  const num = 1;

  useEventListener(player, 'timeUpdate', ({ currentTime }) => {
    setSeekbarOnTimeUpdate(currentTime);
    setClosedCaptionsOnTimeUpdate(currentTime);
  });

  useEffect(() => {
    // 监听转录卡片的点击事件
    const subscription = DeviceEventEmitter.addListener('seekVideo', async (positionMillis) => {
      console.log('event emitted:', positionMillis);
      player.currentTime = Math.round(positionMillis / 1000);
      if (player.status === 'readyToPlay') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        player.play();
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (status === 'readyToPlay') {
      setVideoDuration(player.duration);
      posterOpactity.value = withTiming(0, { duration: 500 });
      // player.play();
    } else if (status === 'loading') {
      posterOpactity.value = withTiming(0.7, { duration: 500 });
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

  // 视频控件的动态透明度
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // 视频加载动画（海报）
  const posterOpactity = useSharedValue(0);
  const animatedPosterStyle = useAnimatedStyle(() => {
    return {
      opacity: posterOpactity.value,
    };
  });

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
          className="relative"
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls={false}
          contentFit="cover"
          allowsVideoFrameAnalysis={false}>
          <Animated.Image
            onLoadStart={() =>
              (posterOpactity.value = withRepeat(withTiming(0.7, { duration: 2000 }), 0, true))
            }
            style={[{ height: '100%', width: '100%' }, animatedPosterStyle]}
            source={require('../assets/imgs/ai.jpg')}
          />
        </VideoView>

        {videoControlsVisible && (
          <Animated.View
            className="absolute left-0 top-0"
            style={[animatedStyle, { width: screenWidth, height: videoHeight }]}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.6)', 'rgba(31, 29, 43, 0)']}
              locations={[0.1317, 0.5086]}
              style={{ height: videoHeight / 2 }}>
              <View
                accessibilityLabel="top-controls"
                className="flex-row justify-between px-4 py-3">
                <View
                  accessibilityLabel="top-left-controls"
                  className="flex-row items-center gap-4">
                  <TouchableIcon>
                    <Ionicons name="chevron-back-outline" size={24} color="#ffffff" />
                  </TouchableIcon>
                  <View className="flex-row items-center gap-1.5 ">
                    <Ionicons name="eye-outline" size={16} color="#ffffff" />
                    <Text className="text-white">{views}人次</Text>
                  </View>
                </View>
                <View
                  accessibilityLabel="top-right-controls"
                  className="flex-row items-center gap-8">
                  <TouchableIcon onPress={() => setccVisible(!ccVisible)}>
                    <Ionicons
                      name="logo-closed-captioning"
                      size={22}
                      color={ccVisible ? '#1556f0' : '#ffffff'}
                    />
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
              colors={['rgba(31, 29, 43, 0)', 'rgba(0, 0, 0, 0.6)']}
              locations={[0.4617, 0.8924]}
              style={{ height: videoHeight / 2, justifyContent: 'flex-end' }}>
              <View
                accessibilityLabel="bottom-controls"
                className="flex-row items-center justify-center gap-3 px-4 py-3">
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
                    minimumTrackTintColor="#1556F0"
                    maximumTrackTintColor="#ffffff75"
                    thumbTintColor="#ffffff65"
                    thumbStyle={{
                      width: 18,
                      height: 18,
                    }}
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
                  <Text className="w-14 text-sm text-white">{formatTime(videoDuration)}</Text>
                </View>
                <TouchableIcon onPress={handleEnterFullscreen}>
                  <Ionicons name="scan-outline" size={24} color="#ffffff" />
                </TouchableIcon>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
        {closedCaption.sentenceId !== -1 && ccVisible && (
          <View style={{ bottom: 64 }} className="absolute left-0 right-0 items-center px-4">
            <View style={{ backgroundColor: '#323232' }}>
              <Text className="p-1 px-8 text-lg text-white" numberOfLines={1}>
                {closedCaption.text}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomVideoView;
