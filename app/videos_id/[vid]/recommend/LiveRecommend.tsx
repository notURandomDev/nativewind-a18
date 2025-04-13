import { View, FlatList } from 'react-native';
import React from 'react';
import { LIVE_RECOMMENDATIONS, replayRecommendations } from 'data/cards';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';

const LiveRecommend = () => {
  return (
    <View className="flex-1 gap-4">
      <FlatList
        contentContainerClassName="gap-5 px-8"
        data={LIVE_RECOMMENDATIONS}
        renderItem={({ item: { title, time, venue, imgSrc, views } }) => (
          <VideoCard
            leftSlot={<VideoThumbnail live imgSrc={imgSrc} views={views} />}
            rightSlot={<InfoSlot title={title} time={time} venue={venue} />}
          />
        )}
      />
    </View>
  );
};

export default LiveRecommend;
