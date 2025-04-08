import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import MyCarousel from 'components/MyCarousel';
import {
  digitalProductsData,
  innovativeCasesData,
  newProductsData,
  strive12Data,
} from 'data/carousels';
import { securityBootcampData } from 'data/cards';
import { VideoCard, InfoSlot } from 'components/VideoCard';
import PortraitCard from 'components/PortraitCard';
import BottomIndicator from 'components/BottomIndicator';

const ActivitiesTabView = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, gap: 24, paddingTop: 12 }}>
      <View className="gap-4">
        <CustomLink title="数字成果展" />
        <MyCarousel data={digitalProductsData} />
      </View>
      <View className="gap-4">
        <CustomLink title="新品发布" />
        <MyCarousel data={newProductsData} />
      </View>
      <View className="gap-4">
        <CustomLink title="安全特训营" />
        <FlatList
          contentContainerClassName="gap-5"
          scrollEnabled={false}
          data={securityBootcampData}
          renderItem={({ item: { imgSrc, ...info } }) => (
            <VideoCard
              leftSlot={<PortraitCard size={80} variant="square" img={imgSrc} />}
              rightSlot={<InfoSlot {...info} />}
            />
          )}
        />
      </View>
      <View className="gap-4">
        <CustomLink title="创新案例实践征集" />
        <MyCarousel data={innovativeCasesData} />
      </View>
      <View className="gap-4">
        <CustomLink title="奋进十二年" />
        <MyCarousel data={strive12Data} />
      </View>
      <BottomIndicator />
    </ScrollView>
  );
};

export default ActivitiesTabView;
