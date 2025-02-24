import { View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomVideoView from 'components/CustomVideoView';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const Explore = () => {
  return (
    <SafeAreaView className="bg-black">
      <View className="flex flex-1 items-center bg-white">
        <CustomVideoView videoSource={videoSource} />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Explore;
