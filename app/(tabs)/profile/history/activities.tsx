import { FlatList } from 'react-native';
import React from 'react';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import { securityBootcampData } from 'data/cards';
import PortraitCard from 'components/PortraitCard';
const Activities = () => {
  return (
    <FlatList
      style={{ paddingHorizontal: 24 }}
      className="py-4"
      contentContainerClassName="gap-5"
      data={securityBootcampData}
      renderItem={({ item: { imgSrc, ...info } }) => (
        <VideoCard
          leftSlot={<PortraitCard size={80} variant="square" img={imgSrc} />}
          rightSlot={<InfoSlot {...info} />}
        />
      )}
    />
  );
};

export default Activities;
