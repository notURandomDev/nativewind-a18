import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomLink from 'components/CustomLink';
import VideoCard from 'components/VideoCard';
import { replayRecommendations } from 'data/cards';
import Ionicons from '@expo/vector-icons/Ionicons';
import MyCarousel from 'components/MyCarousel';
import VideoThumbnail from 'components/VideoThumbnail';
import { rrData } from 'data/carousels';
import BottomIndicator from 'components/BottomIndicator';
import { Link, router } from 'expo-router';
import CarouselCard from 'components/CarouselCard';

interface InfoSlotProps {
  title?: string;
  time?: string;
  venue?: string;
}

export const InfoSlot = ({ title, time, venue }: InfoSlotProps) => {
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

function StreamTabView() {
  return (
    <ScrollView
      contentContainerClassName="gap-8"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      {/* 当前直播 */}
      <View className="gap-4">
        <CustomLink title="当前直播" />
        <MyCarousel data={rrData} />
      </View>
      {/* 我的直播订阅 */}
      <View className="gap-4">
        <CustomLink title="我的直播订阅" />
        <FlatList
          scrollEnabled={false}
          contentContainerClassName="gap-5"
          data={replayRecommendations}
          renderItem={({ item: { title, time, venue, imgSrc, views, duration } }) => (
            <VideoCard
              onPress={() => {
                router.push('../../videos_id/1');
              }}
              leftSlot={<VideoThumbnail imgSrc={imgSrc} views={views} duration={duration} />}
              rightSlot={<InfoSlot title={title} time={time} venue={venue} />}
            />
          )}
        />
      </View>

      <BottomIndicator />
    </ScrollView>
  );
}

export default StreamTabView;
