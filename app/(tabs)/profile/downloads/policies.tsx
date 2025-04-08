import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { policyGalleryData, pptGalleryData } from 'data/cards';
import { FileCover } from 'app/(tabs)/home/downloads';

const Policies = () => {
  return (
    <FlatList
      style={{ paddingHorizontal: 20 }}
      className="py-0"
      contentContainerClassName="gap-2 flex-wrap flex-row justify-between"
      data={[...policyGalleryData, ...policyGalleryData]}
      renderItem={({ item }) => <FileCover {...item} />}
    />
  );
};

export default Policies;
