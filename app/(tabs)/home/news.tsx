import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import Ionicons from '@expo/vector-icons/Ionicons';
import { VideoCard } from 'components/VideoCard';
import { newsFrontierData, photoHighlightsData, videoHighlightsData } from 'data/cards';
import PortraitCard from 'components/PortraitCard';
import VideoThumbnail from 'components/VideoThumbnail';
import BottomIndicator from 'components/BottomIndicator';
import ButtonAllinOne from 'components/ButtonAllinOne';

interface nfRightSlotProps {
  title?: string;
  subtitle?: string;
  views?: number;
  stars?: number;
  likes?: number;
  date?: string;
}

const NFRightSlot = ({ title, subtitle, views, stars, likes, date }: nfRightSlotProps) => {
  return (
    <View className="flex-1 gap-2">
      <Text className="text-xl font-medium" style={{ paddingRight: 24 }} numberOfLines={2}>
        {title}
      </Text>
      <View className="flex-row items-center gap-1">
        <Text numberOfLines={2} className="flex-1 text-sm font-light">
          {subtitle}
        </Text>
      </View>
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

interface NGInfoSlotProps {
  title?: string;
  subtitle?: string;
  views?: number;
  stars?: number;
  likes?: number;
}

const NGInfoSlot = ({ title, subtitle, views, stars, likes }: NGInfoSlotProps) => {
  return (
    <View className="flex-1 gap-3">
      <Text className="text-xl font-medium">{title}</Text>
      <View className="flex-row items-center justify-between">
        <View className="gap-1">
          <View className="flex-row items-center gap-1">
            <Ionicons name="pencil-outline" size={12} color="#8B8B8B" />
            <Text className="text-gray-solid">{subtitle}</Text>
          </View>
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

const NewsFrontier = () => (
  <View className="gap-4">
    <CustomLink title="新闻前线" />
    <FlatList
      contentContainerClassName="gap-4"
      scrollEnabled={false}
      data={newsFrontierData}
      renderItem={({
        item: {
          img: { src, label },
          ...rightSlot
        },
      }) => (
        <VideoCard
          leftSlot={<PortraitCard alignMode="center" variant="square" img={src} label={label} />}
          rightSlot={<NFRightSlot {...rightSlot} />}
        />
      )}
    />
  </View>
);

const VideoHighlights = () => (
  <View className="gap-4">
    <CustomLink title="精彩视频" />

    <FlatList
      contentContainerClassName="gap-4"
      scrollEnabled={false}
      data={videoHighlightsData}
      renderItem={({ item: { video, ...info } }) => (
        <VideoCard leftSlot={<VideoThumbnail {...video} />} rightSlot={<NGInfoSlot {...info} />} />
      )}
    />
  </View>
);

const PhotoHighlights = () => (
  <View className="gap-4">
    <CustomLink title="精彩图片" />
    <View className="flex-row gap-3">
      <ButtonAllinOne label="5月17日" />
      <ButtonAllinOne variant="outline" label="5月18日" />
      <ButtonAllinOne variant="outline" label="5月19日" />
    </View>
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerClassName="gap-4"
      data={photoHighlightsData}
      renderItem={({ item: { label, imgSrc } }) => (
        <PortraitCard size={128} label={label} img={imgSrc} variant="square" alignMode="center" />
      )}
    />
  </View>
);

const NewsTabView = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-8"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="py-3">
      <NewsFrontier />
      <VideoHighlights />
      <PhotoHighlights />
      <BottomIndicator />
    </ScrollView>
  );
};

export default NewsTabView;
