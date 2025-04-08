import { FlatList } from 'react-native';
import React from 'react';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';
import { replayRecommendations } from 'data/cards';

const MeetingReplays = () => {
  return (
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
  );
};

export default MeetingReplays;
