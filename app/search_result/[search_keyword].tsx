import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient4Page } from 'components/MyLinearGradients';
import TouchableIcon from 'components/TouchableIcon';

import { Ionicons } from '@expo/vector-icons';
import MyTextInput from 'components/MyTextInput';
import CustomLink from 'components/CustomLink';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';
import { replayRecommendations } from 'data/cards';

const LIVESTREAM_THUMBNAIL = replayRecommendations[0];
const SearchResult = () => {
  const { search_keyword } = useLocalSearchParams();
  console.log('search_keyword', search_keyword);

  return (
    <SafeAreaView className="relative flex-1 gap-4 bg-white p-4">
      <LinearGradient4Page />
      <View className="flex-row gap-2">
        <TouchableIcon onPress={() => router.back()}>
          <Ionicons size={30} name="chevron-back-outline" />
        </TouchableIcon>
        <View className="flex-1">
          <Text className="text-3xl">{search_keyword}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ gap: 20 }} className="px-2">
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
              <VideoThumbnail
                imgSrc={LIVESTREAM_THUMBNAIL.imgSrc}
                views={LIVESTREAM_THUMBNAIL.views}
              />
            }
            rightSlot={<InfoSlot {...LIVESTREAM_THUMBNAIL} />}
          />
        </View>
        <View className="gap-4">
          <CustomLink title="会议回放" />
        </View>
        <View className="gap-4">
          <CustomLink title="我的笔记" />
        </View>
        <View className="gap-4">
          <CustomLink title="新闻前线" />
        </View>
        <View className="gap-4">
          <CustomLink title="精彩图片" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchResult;
