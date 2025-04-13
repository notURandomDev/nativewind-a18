import { View, FlatList } from 'react-native';
import React from 'react';
import { replayRecommendations } from 'data/cards';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';

const ReplayRecommend = () => {
  return (
    <View className="flex-1 gap-4">
      <FlatList
        contentContainerClassName="gap-5 px-8"
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

export default ReplayRecommend;
