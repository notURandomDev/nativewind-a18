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
  live?: boolean;
}

const InfoSlot = ({ title, time, venue, live = false }: InfoSlotProps) => {
  return (
    <View className="flex-1 justify-between gap-2 pb-1">
      <Text numberOfLines={2} className="text-xl font-medium">
        {live && <Ionicons size={14} name="cellular" color="#1556F0" />}
        {title}
      </Text>
      <View className="flex-1 flex-row items-center justify-between gap-4">
        <View className="flex-1 gap-1">
          <DatetimeSlot datetime={time} />
          <VenueSlot venue={venue} />
        </View>
        <Ionicons name="ellipsis-vertical" size={20} color="#8B8B8B" />
      </View>
    </View>
  );
};

export const DatetimeSlot = ({ datetime }: { datetime: string }) => (
  <View className="flex-row items-center gap-1">
    <Ionicons name="time-outline" size={12} color="#8B8B8B" />
    <Text numberOfLines={1} style={{ fontSize: 13 }} className="text-gray-solid">
      {datetime}
    </Text>
  </View>
);

export const VenueSlot = ({ venue }: { venue: string }) => (
  <View className="flex-row items-center gap-1">
    <Ionicons name="location-outline" size={12} color="#8B8B8B" />
    <Text numberOfLines={1} style={{ fontSize: 13 }} className="text-gray-solid">
      {venue}
    </Text>
  </View>
);

interface NewsFrontierInfoSlotProps {
  title?: string;
  subtitle?: string;
  views?: number;
  stars?: number;
  likes?: number;
  date?: string;
  starred?: boolean;
}

const NewsFrontierInfoSlot = ({
  title,
  subtitle,
  views,
  stars,
  likes,
  date,
  starred = false,
}: NewsFrontierInfoSlotProps) => {
  return (
    <View className="flex-1 justify-between py-1">
      <Text className="text-xl font-medium" style={{ paddingRight: 24 }} numberOfLines={1}>
        {title}
      </Text>
      <Text numberOfLines={2} className="text-sm font-light">
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
            <Ionicons
              name={`star${starred ? '' : '-outline'}`}
              size={12}
              color={`${starred ? '#1556f0' : '#8B8B8B'}`}
            />
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
  starred?: boolean;
}

const NewsVideoHightlights = ({
  title,
  subtitle,
  views,
  stars,
  likes,
  starred = false,
}: NewsVideoHightlightsProps) => {
  return (
    <View className="flex-1 gap-3">
      <Text numberOfLines={2} className="text-xl font-medium">
        {title}
      </Text>
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
                <Ionicons
                  name={`star${starred ? '' : '-outline'}`}
                  size={12}
                  color={`${starred ? '#1556f0' : '#8B8B8B'}`}
                />
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
