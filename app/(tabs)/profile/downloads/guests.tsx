import { ScrollView, FlatList } from 'react-native';
import React from 'react';
import { Header } from './slides';
import { guestsPosterData } from 'data/cards';
import { FileCover } from 'app/(tabs)/home/downloads';

const Guests = () => {
  return (
    <ScrollView style={{ paddingHorizontal: 20 }}>
      <Header title="5月17日" />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        className="py-4"
        contentContainerClassName="gap-5"
        data={guestsPosterData.slice(0, 2)}
        renderItem={({ item }) => <FileCover {...item} />}
      />
      <Header title="5月18日" />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        className="py-4"
        contentContainerClassName="gap-5"
        data={guestsPosterData.slice(2)}
        renderItem={({ item }) => <FileCover {...item} />}
      />
    </ScrollView>
  );
};

export default Guests;
