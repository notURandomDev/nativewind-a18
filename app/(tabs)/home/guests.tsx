import { View, Text, ScrollView, ImageBackground } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import { LinearGradient } from 'expo-linear-gradient';
import PortraitCard from 'components/PortraitCard';

const GuestsTabView = () => {
  return (
    <ScrollView contentContainerClassName="gap-5 px-2 py-3" className="px-2">
      <View className="gap-4">
        <CustomLink title="专家委员会" subtitle="嘉宾排名不分先后" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-3"
          horizontal={true}>
          <PortraitCard />
          <PortraitCard />
          <PortraitCard />
          <PortraitCard />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default GuestsTabView;
