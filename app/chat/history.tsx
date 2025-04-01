import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { chatHistoryData1, chatHistoryData2, chatHistoryData3 } from 'data/chat';

interface HistoryListSectionProps {
  label: string;
  data: Array<any>;
}

const HistoryListSection = ({ label, data }: HistoryListSectionProps) => (
  <View className="gap-4">
    <Text className="text-xl text-gray-solid">{label}</Text>
    <FlatList
      scrollEnabled={false}
      contentContainerStyle={{ gap: 20 }}
      data={data}
      renderItem={({ item }) => <HistoryListItem {...item} />}
    />
  </View>
);

interface historyListItemProp {
  title: string;
  chatId: number;
}

const HistoryListItem = ({ title, chatId }: historyListItemProp) => (
  <View className="flex-row items-center gap-4">
    <Ionicons name="chatbubble-outline" size={24} color="black" />
    <Text className="text-xl">{title}</Text>
  </View>
);

const History = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-8"
      contentContainerStyle={{ paddingHorizontal: 20 }}
      className="relative bg-white py-3">
      <HistoryListSection label="今天" data={chatHistoryData1} />
      <HistoryListSection label="昨天" data={chatHistoryData2} />
      <HistoryListSection label="7天内" data={chatHistoryData3} />
    </ScrollView>
  );
};

export default History;
