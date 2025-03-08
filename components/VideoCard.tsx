import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface VideoCardProps {
  title?: string;
  time?: string;
  venue?: string;
}

const VideoCard = ({ title, time, venue }: VideoCardProps) => {
  return (
    <View className="flex-row gap-4 px-2">
      <View>
        <ImageBackground
          imageStyle={{ borderRadius: 8.7 }}
          className="rounded-xl"
          style={{ height: 82, width: 140, borderRadius: 20 }}
          source={require('../assets/imgs/ai.jpg')}></ImageBackground>
      </View>
      <View className="flex-1 gap-2">
        <Text className="text-lg font-medium">{title}</Text>
        <View className="gap-1">
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={14} color="#8B8B8B" />
            <Text className="text-gray-solid">{time}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={14} color="#8B8B8B" />
            <Text className="text-gray-solid">{venue}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoCard;
