import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const DownloadView = () => {
  return (
    <View style={{ flexWrap: 'wrap', rowGap: 12 }} className="flex-row justify-center gap-2">
      {CARDS.map((item, index) => (
        <Card key={`card-${index}`} {...item} />
      ))}
    </View>
  );
};

const CARDS: CardsProps[] = [
  {
    title: '会议议程',
    iconName: 'pie-chart-outline',
  },
  {
    title: '演讲PPT',
    iconName: 'albums-outline',
  },
  {
    title: '实物指南',
    iconName: 'book-outline',
  },
  {
    title: '政策文献',
    iconName: 'library-outline',
  },
];
interface CardsProps {
  title: string;
  iconName: 'pie-chart-outline' | 'albums-outline' | 'book-outline' | 'library-outline';
}
const Card = ({ title, iconName }: CardsProps) => (
  <View style={{ paddingVertical: 12, width: '48.5%' }} className="relative gap-4 px-4">
    <LinearGradient
      style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0, borderRadius: 17 }}
      colors={['#f5f8ff', '#e9e8ff']}
    />
    <View style={{ right: 0, top: 0, bottom: 0 }} className="absolute justify-center p-2">
      <Ionicons size={48} color="#1556F020" name={iconName} />
    </View>
    <View className="flex-row items-center gap-1.5">
      <Ionicons size={24} color="#1556F0" name={iconName} />
      <Text style={{ fontSize: 20 }} className="font-medium text-blue">
        {title}
      </Text>
    </View>
    <View className="flex-row gap-2">
      <View style={{ borderRadius: 6 }} className="bg-white px-2 py-1.5">
        <Text className="text-sm text-blue">在线浏览</Text>
      </View>
      <View style={{ borderRadius: 6 }} className="bg-white px-2 py-1.5">
        <Text className="text-sm text-blue">本地下载</Text>
      </View>
    </View>
  </View>
);

export default DownloadView;
