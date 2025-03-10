import { View, Text, ScrollView, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import CustomLink from 'components/CustomLink';
import { LinearGradient } from 'expo-linear-gradient';
import PortraitCard from 'components/PortraitCard';
import { committeeCardsData } from 'data/cards';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Ionicons from '@expo/vector-icons/Ionicons';
import { speechListData } from '../../../data/cards';
import VideoCard from 'components/VideoCard';

const CommitteeCards = () => {
  return committeeCardsData.map(({ title, subtitle, img }, index) => (
    <PortraitCard title={title} subtitle={subtitle} img={img} key={`cc-${index}`} />
  ));
};

interface speechRightSlotProps {
  title?: string;
  subtitle?: string;
  views?: number;
  stars?: number;
  likes?: number;
}

const SpeechRightSlot = ({ title, subtitle, views, stars, likes }: speechRightSlotProps) => {
  return (
    <View className="flex-1 gap-4">
      <Text style={{ paddingRight: 24 }} numberOfLines={1}>
        {subtitle}
      </Text>
      <View className="flex-row items-center gap-1">
        <Text numberOfLines={2} className="flex-1 text-lg font-medium">
          {title}
        </Text>
        <Ionicons name="play-circle" size={40} color="#1556F0" />
      </View>
      <View className="flex-row justify-between " style={{ paddingRight: 12 }}>
        <View className="flex-row gap-3">
          <View className="flex-row items-center gap-1">
            <Ionicons name="eye-outline" size={14} color="#8B8B8B" />
            <Text className="text-gray-solid">{views}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="star-outline" size={14} color="#8B8B8B" />
            <Text className="text-gray-solid">{stars}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="thumbs-up-outline" size={14} color="#8B8B8B" />
            <Text className="text-gray-solid">{likes}</Text>
          </View>
        </View>
        <Text>{`${1}/${2}`}</Text>
      </View>
    </View>
  );
};

const SpeechList = () => {
  return speechListData.map(({ speaker, ...rightSlot }, index) => (
    <VideoCard
      key={`sl-${index}`}
      leftSlot={
        <PortraitCard variant="square" img={require('../../../assets/imgs/guest-p-2.png')} />
      }
      rightSlot={<SpeechRightSlot {...rightSlot} />}
    />
  ));
};

const GuestsTabView = () => {
  const [guestToggle, setGuestToggle] = useState(true);

  return (
    <ScrollView
      contentContainerClassName="gap-8 py-3"
      contentContainerStyle={{ paddingHorizontal: 16 }}>
      <View className="gap-4">
        <CustomLink title="专家委员会" subtitle="嘉宾排名不分先后" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-3"
          horizontal={true}>
          <CommitteeCards />
        </ScrollView>
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
        <View className="flex-1 gap-5">
          <SpeechList />
        </View>
      </View>
    </ScrollView>
  );
};

export default GuestsTabView;
