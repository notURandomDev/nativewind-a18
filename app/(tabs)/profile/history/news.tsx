import { FlatList } from 'react-native';
import React from 'react';
import { NewsFrontierInfoSlot, VideoCard } from 'components/VideoCard';
import { newsFrontierData } from 'data/cards';
import PortraitCard from 'components/PortraitCard';

const News = () => {
  return (
    <FlatList
      style={{ paddingHorizontal: 24 }}
      contentContainerClassName="gap-5"
      data={newsFrontierData}
      renderItem={({
        item: {
          img: { src, label },
          ...rightSlot
        },
      }) => (
        <VideoCard
          leftSlot={
            <PortraitCard size={80} alignMode="center" variant="square" img={src} label={label} />
          }
          rightSlot={<NewsFrontierInfoSlot starred {...rightSlot} />}
        />
      )}
    />
  );
};

export default News;
