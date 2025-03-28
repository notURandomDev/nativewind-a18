import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { replayRecommendations } from 'data/cards';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';

const Collection = () => {
  return (
    <View className="flex-1">
      <View className="flex-row gap-2" style={{ paddingHorizontal: 24 }}>
        <ButtonAllinOne label="大咖演讲" />
        <ButtonAllinOne variant="outline" label="新闻前线" />
        <ButtonAllinOne variant="outline" label="精彩视频" />
        <ButtonAllinOne variant="outline" label="精彩图片" />
      </View>
      <FlatList
        style={{ paddingHorizontal: 24 }}
        className="py-4"
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
  );
};

export default Collection;
