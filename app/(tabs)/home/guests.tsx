import { View, Text, ScrollView, ImageBackground, FlatList } from 'react-native';
import React, { useState } from 'react';
import CustomLink from 'components/CustomLink';
import { LinearGradient } from 'expo-linear-gradient';
import PortraitCard from 'components/PortraitCard';
import { committeeCardsData } from 'data/cards';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Ionicons from '@expo/vector-icons/Ionicons';
import { speechListData } from '../../../data/cards';
import { VideoCard } from 'components/VideoCard';
import BottomIndicator from 'components/BottomIndicator';

interface speechRightSlotProps {
  title?: string;
  subtitle?: string;
  views?: number;
  stars?: number;
  likes?: number;
}

const SpeechRightSlot = ({ title, subtitle, views, stars, likes }: speechRightSlotProps) => {
  return (
    <View className="flex-1 flex-row justify-between gap-2">
      <View className="flex-1 justify-between gap-1 pb-1">
        <View className="gap-1">
          <Text numberOfLines={1} className="text-xl font-medium">
            {title}
          </Text>
          <Text className="font-light text-gray-solid" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
        <View className="flex-row items-center justify-between" style={{ paddingRight: 12 }}>
          <View className="flex-row gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="eye-outline" size={12} color="#8B8B8B" />
              <Text className="text-sm text-gray-solid">{views}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="star-outline" size={12} color="#8B8B8B" />
              <Text className="text-sm text-gray-solid">{stars}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="thumbs-up-outline" size={12} color="#8B8B8B" />
              <Text className="text-sm text-gray-solid">{likes}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="justify-center">
        <Ionicons name="play-circle" size={40} color="#1556F0" />
      </View>
    </View>
  );
};

const GuestsTabView = () => {
  const [guestToggle, setGuestToggle] = useState(true);

  return (
    <ScrollView
      contentContainerClassName="gap-8 py-3"
      contentContainerStyle={{ paddingHorizontal: 16 }}>
      <View className="gap-4">
        <CustomLink title="专家委员会" subtitle="嘉宾排名不分先后" />
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-3"
          horizontal={true}
          data={committeeCardsData}
          renderItem={({ item: { title, subtitle, img } }) => (
            <PortraitCard title={title} subtitle={subtitle} img={img} />
          )}
        />
      </View>
      <View className="gap-4">
        <CustomLink title="大咖演讲" subtitle="嘉宾排名不分先后" />
        <View className="flex-row gap-3">
          <ButtonAllinOne
            label="本届嘉宾"
            onPress={() => {
              setGuestToggle(true);
            }}
            variant={guestToggle ? 'solid' : 'outline'}
          />
          <ButtonAllinOne
            label="往届嘉宾"
            onPress={() => {
              setGuestToggle(false);
            }}
            variant={guestToggle ? 'outline' : 'solid'}
          />
        </View>
        <FlatList
          scrollEnabled={false}
          contentContainerClassName="gap-5"
          data={speechListData}
          renderItem={({
            item: {
              img: { title, subtitle, src },
              ...rightSlot
            },
          }) => (
            <VideoCard
              leftSlot={
                <PortraitCard variant="square" title={title} subtitle={subtitle} img={src} />
              }
              rightSlot={<SpeechRightSlot {...rightSlot} />}
            />
          )}
        />
      </View>
      <BottomIndicator />
    </ScrollView>
  );
};

export default GuestsTabView;
