import { FlatList, ScrollView, Text, View } from 'react-native';
import { pptGalleryData } from 'data/cards';
import React from 'react';
import { FileCover } from 'app/(tabs)/home/downloads';

const Slides = () => {
  return (
    <ScrollView style={{ paddingHorizontal: 20 }}>
      <Header title="5月17日" />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        className="py-4"
        contentContainerClassName="gap-5"
        data={pptGalleryData.slice(0, 1)}
        renderItem={({ item }) => <FileCover {...item} />}
      />
      <Header title="5月18日" />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        className="py-4"
        contentContainerClassName="gap-5"
        data={pptGalleryData.slice(1, 3)}
        renderItem={({ item }) => <FileCover {...item} />}
      />
      <Header title="5月19日" />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        className="py-4"
        contentContainerClassName="gap-5"
        data={pptGalleryData.slice(0, 1)}
        renderItem={({ item }) => <FileCover {...item} />}
      />
    </ScrollView>
  );
};

export const Header = ({ title }: { title: string }) => (
  <View>
    <Text className="text-2xl font-medium">{title}</Text>
  </View>
);

export default Slides;
