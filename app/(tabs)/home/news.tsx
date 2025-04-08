import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NewsFrontierInfoSlot, NewsVideoHightlights, VideoCard } from 'components/VideoCard';
import { newsFrontierData, photoHighlightsData, videoHighlightsData } from 'data/cards';
import PortraitCard from 'components/PortraitCard';
import VideoThumbnail from 'components/VideoThumbnail';
import BottomIndicator from 'components/BottomIndicator';
import ButtonAllinOne from 'components/ButtonAllinOne';

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
          leftSlot={
            <PortraitCard size={80} alignMode="center" variant="square" img={src} label={label} />
          }
          rightSlot={<NewsFrontierInfoSlot {...rightSlot} />}
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
        <VideoCard
          leftSlot={<VideoThumbnail {...video} />}
          rightSlot={<NewsVideoHightlights {...info} />}
        />
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
