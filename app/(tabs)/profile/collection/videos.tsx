import { FlatList } from 'react-native';
import React from 'react';
import { NewsVideoHightlights, VideoCard } from 'components/VideoCard';
import { videoHighlightsData } from 'data/cards';
import VideoThumbnail from 'components/VideoThumbnail';

const Videos = () => {
  return (
    <FlatList
      style={{ paddingHorizontal: 24 }}
      contentContainerClassName="gap-5"
      data={videoHighlightsData}
      renderItem={({ item: { video, ...info } }) => (
        <VideoCard
          leftSlot={<VideoThumbnail {...video} />}
          rightSlot={<NewsVideoHightlights starred {...info} />}
        />
      )}
    />
  );
};

export default Videos;
