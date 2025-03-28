import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { replayRecommendations } from 'data/cards';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';

const Downloads = () => {
  return (
    <View className="flex-1">
      <View className="flex-row gap-2" style={{ paddingHorizontal: 24 }}>
        <ButtonAllinOne label="PPT集锦" />
        <ButtonAllinOne variant="outline" label="政策文献与实务指南" />
        <ButtonAllinOne variant="outline" label="议程海报" />
        <ButtonAllinOne variant="outline" label="嘉宾海报" />
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

export default Downloads;
