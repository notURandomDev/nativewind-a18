import { FlatList } from 'react-native';
import React from 'react';
import { speechListData } from 'data/cards';
import { VideoCard } from 'components/VideoCard';
import PortraitCard from 'components/PortraitCard';
import { SpeechRightSlot } from 'app/(tabs)/home/guests';

const Speeches = () => {
  return (
    <FlatList
      style={{ paddingHorizontal: 24 }}
      contentContainerClassName="gap-5"
      data={speechListData}
      renderItem={({
        item: {
          img: { title, subtitle, src },
          ...rightSlot
        },
      }) => (
        <VideoCard
          leftSlot={<PortraitCard variant="square" title={title} subtitle={subtitle} img={src} />}
          rightSlot={<SpeechRightSlot starred {...rightSlot} />}
        />
      )}
    />
  );
};

export default Speeches;
