import { View, Text, ImageBackground, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { REPLAY_RECOMMENDATIONS } from './data';
import { ReplayCardProps } from './types';
import CustomLink from 'components/CustomLink';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { replayRecommendations } from 'data/cards';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';
import BottomIndicator from 'components/BottomIndicator';

const ReplayTabView = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-8"
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      className="relative">
      {/* 当前直播 */}
      <View className="gap-4">
        <CustomLink title="热门回放推荐" />
        <View className="flex-row justify-between gap-4" style={{ flexWrap: 'wrap' }}>
          {REPLAY_RECOMMENDATIONS.map((data, index) => (
            <Card {...data} key={`card-${index}`} />
          ))}
        </View>
      </View>
      <View className="gap-4">
        <CustomLink title="回放观看历史" />
        <FlatList
          scrollEnabled={false}
          contentContainerClassName="gap-5"
          data={replayRecommendations}
          renderItem={({ item: { title, time, venue, imgSrc, views, duration } }) => (
            <VideoCard
              leftSlot={<VideoThumbnail imgSrc={imgSrc} views={views} duration={duration} />}
              rightSlot={<InfoSlot title={title} time={time} venue={venue} />}
            />
          )}
        />
      </View>
      <BottomIndicator />
    </ScrollView>
  );
};

const Card = ({ title, datetime, venue, tag, views, imgsrc }: ReplayCardProps) => (
  <ImageBackground
    resizeMode="cover"
    imageStyle={{ width: '100%', borderRadius: 16 }}
    style={{ width: '47.5%', height: 220, position: 'relative' }}
    source={imgsrc}>
    <LinearGradient
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0, y: 1 }}
      colors={['#6d6d6d00', '#000000']}
      style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0, borderRadius: 16 }}
    />
    <View className="flex-1 p-4">
      <View className="flex-row justify-between">
        <Chip tag={tag} />
        <ViewsCount views={views} />
      </View>
      <View className="flex-1 justify-end pb-4">
        <Text className="text-2xl font-medium text-white">{title}</Text>
      </View>
      <View className="gap-1">
        <Datetime datetime={datetime} />
        <Venue venue={venue} />
      </View>
    </View>
  </ImageBackground>
);

const Chip = ({ tag }: { tag: string }) => (
  <View className="flex-row items-center gap-1 rounded-full bg-white px-2 py-1">
    <Ionicons name="ellipse" color="#1556F0" size={8} />
    <Text className="text-sm" style={{ color: '#111111' }}>
      {tag}
    </Text>
  </View>
);

const ViewsCount = ({ views }: { views: number }) => (
  <View className="flex-row items-center gap-1">
    <Ionicons name="eye-outline" color="#ffffff" size={12} />
    <Text className="text-sm text-white">{views}</Text>
  </View>
);

const Datetime = ({ datetime }: { datetime: string }) => (
  <View className="flex-row items-center gap-1">
    <Ionicons name="time-outline" color="#ffffff" size={12} />
    <Text className="text-xs font-medium text-white">{datetime}</Text>
  </View>
);

const Venue = ({ venue }: { venue: string }) => (
  <View className="flex-row items-center gap-1">
    <Ionicons name="location-outline" color="#ffffff" size={12} />
    <Text className="text-xs font-medium text-white">{venue}</Text>
  </View>
);
export default ReplayTabView;
