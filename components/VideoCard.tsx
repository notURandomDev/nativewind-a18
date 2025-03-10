import { View, Text, ImageBackground, Image } from 'react-native';
import React, { ReactNode } from 'react';

interface VideoCardProps {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

const VideoCard = ({ leftSlot, rightSlot }: VideoCardProps) => {
  return (
    <View className="flex-row gap-4">
      {leftSlot}
      {rightSlot}
    </View>
  );
};

export default VideoCard;
