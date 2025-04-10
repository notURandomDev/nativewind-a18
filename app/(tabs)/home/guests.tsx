import { View, Text, ScrollView, ImageBackground, FlatList } from 'react-native';
import React, { useState } from 'react';
import CustomLink from 'components/CustomLink';
import { LinearGradient } from 'expo-linear-gradient';
import PortraitCard from 'components/PortraitCard';
import { committeeCardsData, speechListPrev } from 'data/cards';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Ionicons from '@expo/vector-icons/Ionicons';
import { speechListData } from '../../../data/cards';
import { DatetimeSlot, VideoCard } from 'components/VideoCard';
import BottomIndicator from 'components/BottomIndicator';

interface speechRightSlotProps {
  title?: string;
  subtitle?: string;
  views?: number;
  stars?: number;
  likes?: number;
  datetime: string;
  starred?: boolean;
}

export const SpeechRightSlot = ({
  title,
  subtitle,
  views,
  stars,
  likes,
  datetime,
  starred = false,
}: speechRightSlotProps) => {
  return (
    <View className="flex-1 flex-row justify-between gap-2">
      <View className="flex-1 justify-between gap-1 pb-1">
        <Text numberOfLines={1} className="text-xl font-medium">
          {title}
        </Text>
        <Text className="font-light" numberOfLines={1}>
          {subtitle}
        </Text>
        <View className="flex-row justify-between">
          <DatetimeSlot datetime={datetime} />
          <View className="flex-row items-center justify-between" style={{ paddingRight: 12 }}>
            <View className="flex-row gap-3">
              <View className="flex-row items-center gap-1">
                <Ionicons name="eye-outline" size={12} color="#8B8B8B" />
                <Text className="text-sm text-gray-solid">{views}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons
                  name={`star${starred ? '' : '-outline'}`}
                  size={12}
                  color={`${starred ? '#1556f0' : '#8B8B8B'}`}
                />
                <Text className="text-sm text-gray-solid">{stars}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="thumbs-up-outline" size={12} color="#8B8B8B" />
                <Text className="text-sm text-gray-solid">{likes}</Text>
              </View>
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
  const [buttonIndex, setButtonIndex] = useState(0);

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, gap: 24, paddingTop: 12 }}>
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
              setButtonIndex(0);
            }}
            variant={buttonIndex === 0 ? 'solid' : 'outline'}
          />
          <ButtonAllinOne
            label="往届嘉宾"
            onPress={() => {
              setButtonIndex(1);
            }}
            variant={buttonIndex === 1 ? 'solid' : 'outline'}
          />
        </View>
        <FlatList
          scrollEnabled={false}
          contentContainerClassName="gap-5"
          data={buttonIndex === 0 ? speechListData : speechListPrev}
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
