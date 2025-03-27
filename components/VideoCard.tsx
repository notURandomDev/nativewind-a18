import { View, Text, ImageBackground, Image } from 'react-native';
import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

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

interface InfoSlotProps {
  title?: string;
  time?: string;
  venue?: string;
}

const InfoSlot = ({ title, time, venue }: InfoSlotProps) => {
  return (
    <View className="flex-1 gap-2">
      <Text className="text-lg font-medium">{title}</Text>
      <View className="flex-row items-center justify-between">
        <View className="gap-1">
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={12} color="#8B8B8B" />
            <Text style={{ fontSize: 12 }} className="text-gray-solid">
              {time}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={12} color="#8B8B8B" />
            <Text style={{ fontSize: 12 }} className="text-gray-solid">
              {venue}
            </Text>
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" size={16} color="#8B8B8B" />
      </View>
    </View>
  );
};

export { VideoCard, InfoSlot };
