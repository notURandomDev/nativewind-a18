import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient4Page } from 'components/MyLinearGradients';
import TouchableIcon from 'components/TouchableIcon';

import { Ionicons } from '@expo/vector-icons';
import CustomLink from 'components/CustomLink';
import { InfoSlot, NewsFrontierInfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';
import { newsFrontierData, photoHighlightsData, replayRecommendations } from 'data/cards';
import { NoteItem } from 'components/NoteItem';
import PortraitCard from 'components/PortraitCard';
import BottomIndicator from 'components/BottomIndicator';

const LIVESTREAM_DATA = replayRecommendations[0];
const REPLAY_DATA = replayRecommendations[1];
const NEWS_DATA = newsFrontierData[0];
const PHOTOS_DATA = photoHighlightsData;

const NOTE_ITEMS = [
  {
    id: 1,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'UNCATEGORIZED',
  },
  {
    id: 2,
    title: '云计算与AI融合：共创数字智能新时代',
    date: '2025年5月18日',
    subtitle: '随着大语言模型与云的结合，技...',
    category: 'PRIVATE',
  },
];

const SearchResult = () => {
  const { search_keyword } = useLocalSearchParams();
  console.log('search_keyword', search_keyword);

  return (
    <SafeAreaView className="relative flex-1 gap-4 bg-white py-4">
      <LinearGradient4Page />
      <View className="flex-row gap-2 px-4">
        <TouchableIcon onPress={() => router.back()}>
          <Ionicons size={30} name="chevron-back-outline" />
        </TouchableIcon>
        <View className="flex-1">
          <Text className="text-3xl">{search_keyword}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ gap: 20 }} style={{ paddingHorizontal: 16 }}>
        <View
          className="flex-row items-center justify-between rounded-3xl border border-gray bg-white py-4"
          style={{ paddingLeft: 30, paddingRight: 16 }}>
          <View className="flex-row">
            <Text className="text-2xl text-blue">安恒AI</Text>
            <Text className="text-2xl">·找到了以下结果</Text>
          </View>
          <Ionicons size={16} name="chevron-down" />
        </View>
        <View className="gap-4">
          <CustomLink title="会议直播" />
          <VideoCard
            leftSlot={
              <VideoThumbnail imgSrc={LIVESTREAM_DATA.imgSrc} views={LIVESTREAM_DATA.views} />
            }
            rightSlot={<InfoSlot {...LIVESTREAM_DATA} />}
          />
        </View>
        <View className="gap-4">
          <CustomLink title="会议回放" />
          <VideoCard
            leftSlot={
              <VideoThumbnail imgSrc={LIVESTREAM_DATA.imgSrc} views={LIVESTREAM_DATA.views} />
            }
            rightSlot={<InfoSlot {...LIVESTREAM_DATA} />}
          />
        </View>
        <View className="gap-4">
          <CustomLink title="我的笔记" />
          {NOTE_ITEMS.map((note) => (
            <NoteItem category="DEFAULT" />
          ))}
        </View>
        <View className="gap-4">
          <CustomLink title="新闻前线" />
          <VideoCard
            leftSlot={
              <PortraitCard
                alignMode="center"
                variant="square"
                img={NEWS_DATA.img.src}
                label={NEWS_DATA.img.label}
              />
            }
            rightSlot={<NewsFrontierInfoSlot {...NEWS_DATA} />}
          />
        </View>
        <View className="gap-4">
          <CustomLink title="精彩图片" />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerClassName="gap-4"
            data={PHOTOS_DATA}
            renderItem={({ item: { label, imgSrc } }) => (
              <PortraitCard label={label} img={imgSrc} variant="square" alignMode="center" />
            )}
          />
        </View>
        <BottomIndicator />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchResult;
