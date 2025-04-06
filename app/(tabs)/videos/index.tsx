import * as React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import CustomLink from 'components/CustomLink';
import { VideoCard } from 'components/VideoCard';
import { replayRecommendations } from 'data/cards';
import Ionicons from '@expo/vector-icons/Ionicons';
import MyCarousel from 'components/MyCarousel';
import VideoThumbnail from 'components/VideoThumbnail';
import { rrData } from 'data/carousels';
import BottomIndicator from 'components/BottomIndicator';
import { Link, router } from 'expo-router';
import PortraitCard from 'components/PortraitCard';
import { TRAILERS } from './data';
import { TrailerProps } from './types';

interface InfoSlotProps {
  title?: string;
  time?: string;
  venue?: string;
  live?: string;
}

export const InfoSlot = ({ title, time, venue }: InfoSlotProps) => {
  return (
    <View className="flex-1 gap-2">
      <View className="flex-row">
        <Text className="text-lg font-medium">
          <Ionicons name="cellular" size={12} color="#1556F0" />
          {` ${title}`}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="gap-1.5">
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={14} color="#8B8B8B" />
            <Text style={{ fontSize: 12 }} className="text-gray-solid">
              {time}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={14} color="#8B8B8B" />
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
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
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
              leftSlot={<VideoThumbnail live imgSrc={imgSrc} views={views} />}
              rightSlot={<InfoSlot title={title} time={time} venue={venue} />}
            />
          )}
        />
      </View>
      <View className="gap-4">
        <CustomLink title="直播预告" />
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-4"
          data={TRAILERS}
          renderItem={({ item }) => <Trailer {...item} />}
          horizontal
        />
      </View>
      <View className="gap-4">
        <CustomLink title="直播观看历史" />
        <FlatList
          scrollEnabled={false}
          contentContainerClassName="gap-5"
          data={replayRecommendations}
          renderItem={({ item: { title, time, venue, imgSrc, views, duration } }) => (
            <VideoCard
              onPress={() => {
                router.push('../../videos_id/1');
              }}
              leftSlot={<VideoThumbnail live imgSrc={imgSrc} views={views} />}
              rightSlot={<InfoSlot title={title} time={time} venue={venue} />}
            />
          )}
        />
      </View>
      <BottomIndicator />
    </ScrollView>
  );
}

const Trailer = ({ title, datetime, venue, imgsrc }: TrailerProps) => (
  <View className="flex-1 justify-center gap-2">
    <PortraitCard size={122} variant="square" img={imgsrc} label="直播预告" alignMode="center" />
    <View className="flex-1 gap-2 px-1" style={{ width: 122 }}>
      <Text numberOfLines={2} style={{ lineHeight: 22 }} className="text-xl font-medium">
        {title}
      </Text>
    </View>
  </View>
);

export default StreamTabView;
