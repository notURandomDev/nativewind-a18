import * as React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import CustomLink from 'components/CustomLink';
import { VideoCard, InfoSlot } from 'components/VideoCard';
import { replayRecommendations } from 'data/cards';
import MyCarousel from 'components/MyCarousel';
import VideoThumbnail from 'components/VideoThumbnail';
import { rrData } from 'data/carousels';
import BottomIndicator from 'components/BottomIndicator';
import { router } from 'expo-router';

function App() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, gap: 24, paddingTop: 12 }}
      className="relative">
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
              onPress={() => router.push('../../videos_id/1')}
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
