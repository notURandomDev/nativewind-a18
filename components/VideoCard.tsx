import { View, Text, ImageBackground, Image } from 'react-native';
import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { router } from 'expo-router';

interface VideoCardProps {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onPress?: () => void;
}

const VideoCard = ({ leftSlot, rightSlot, onPress }: VideoCardProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className="flex-row items-center gap-4">
        {leftSlot}
        {rightSlot}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoCard;
