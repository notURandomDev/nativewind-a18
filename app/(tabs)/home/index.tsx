import * as React from 'react';
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import CustomLink from 'components/CustomLink';
import { VideoCard, InfoSlot } from 'components/VideoCard';
import { replayRecommendations } from 'data/cards';
import MyCarousel from 'components/MyCarousel';
import VideoThumbnail from 'components/VideoThumbnail';
import { rrData } from 'data/carousels';
import BottomIndicator from 'components/BottomIndicator';
import { Link } from 'expo-router';
import ChatActivator from 'components/ChatActivator';

function App() {
  return (
    <ScrollView
      contentContainerClassName="gap-8"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      {/* 直播推荐 */}
      <View className="gap-4">
        <CustomLink title="直播推荐" />
        <MyCarousel data={rrData} />
      </View>
      {/* 回放推荐 */}
      <View className="gap-4">
        <CustomLink title="回放推荐" />
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
}

export default App;
