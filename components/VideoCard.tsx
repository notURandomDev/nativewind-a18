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
      <View className="flex-row gap-4">
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

interface NewsFrontierInfoSlotProps {
  title?: string;
  subtitle?: string;
  views?: number;
  stars?: number;
  likes?: number;
  date?: string;
}

const NewsFrontierInfoSlot = ({
  title,
  subtitle,
  views,
  stars,
  likes,
  date,
}: NewsFrontierInfoSlotProps) => {
  return (
    <View className="flex-1 gap-1">
      <Text className="text-xl font-medium" style={{ paddingRight: 24 }} numberOfLines={1}>
        {title}
      </Text>
      <Text numberOfLines={1} className="flex-1 text-sm font-light">
        {subtitle}
      </Text>
      <View className="flex-row justify-between " style={{ paddingRight: 12 }}>
        <View className="flex-row items-center gap-1">
          <Ionicons name="time-outline" size={12} color="#8B8B8B" />
          <Text className="text-sm text-gray-solid">{date}</Text>
        </View>
        <View className="flex-row gap-3">
          <View className="flex-row items-center gap-1">
            <Ionicons name="eye-outline" size={12} color="#8B8B8B" />
            <Text className="text-sm text-gray-solid">{views}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="star-outline" size={12} color="#8B8B8B" />
            <Text className="text-sm text-gray-solid">{stars}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="thumbs-up-outline" size={12} color="#8B8B8B" />
            <Text className="text-sm text-gray-solid">{likes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

interface NewsVideoHightlightsProps {
  title?: string;
  subtitle?: string;
  views?: number;
  stars?: number;
  likes?: number;
}

const NewsVideoHightlights = ({
  title,
  subtitle,
  views,
  stars,
  likes,
}: NewsVideoHightlightsProps) => {
  return (
    <View className="flex-1 gap-3">
      <Text className="text-xl font-medium">{title}</Text>
      <View className="flex-row items-center justify-between">
        <View className="gap-1.5">
          <Text className="text-gray-solid">{subtitle}</Text>
          <View className="flex-row justify-between " style={{ paddingRight: 12 }}>
            <View className="flex-row gap-3">
              <View className="flex-row items-center gap-1">
                <Ionicons name="eye-outline" size={12} color="#8B8B8B" />
                <Text className="text-sm text-gray-solid">{views}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="star-outline" size={12} color="#8B8B8B" />
                <Text className="text-sm text-gray-solid">{stars}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="thumbs-up-outline" size={12} color="#8B8B8B" />
                <Text className="text-sm text-gray-solid">{likes}</Text>
              </View>
            </View>
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" size={16} color="#8B8B8B" />
      </View>
    </View>
  );
};

export { VideoCard, InfoSlot, NewsVideoHightlights, NewsFrontierInfoSlot };
