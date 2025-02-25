import { View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomVideoView from 'components/CustomVideoView';

const Explore = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex items-center bg-black">
          <CustomVideoView />
        </View>
        <View className="h-full bg-white"></View>
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Explore;
