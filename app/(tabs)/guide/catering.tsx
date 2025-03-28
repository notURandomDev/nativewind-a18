import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { ServiceCard, VenueServiceCard } from 'components/ServiceCard';

const CATERING_PEEKS = [
  { label: '午餐一览', source: require('../../../assets/imgs/catering-lunch.png') },
  { label: '茶歇一览', source: require('../../../assets/imgs/catering-dimsum.png') },
  { label: '晚餐一览', source: require('../../../assets/imgs/catering-supper.png') },
];

const CATERING_SERVICES = [
  { label: '单人餐预定', source: require('../../../assets/imgs/catering-single.png') },
  { label: '团餐预定', source: require('../../../assets/imgs/catering-multi.png') },
  { label: '包厢预定', source: require('../../../assets/imgs/catering-room.png') },
  { label: '特制餐食服务', source: require('../../../assets/imgs/catering-custom.png') },
];

const CateringTabView = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      <View className="gap-4">
        <CustomLink title="会场餐饮公示" />
        <View className="flex-row gap-2">
          <ButtonAllinOne label="5月17日" />
          <ButtonAllinOne variant="outline" label="5月18日" />
          <ButtonAllinOne variant="outline" label="5月19日" />
        </View>
        <View className="flex-row gap-4">
          {CATERING_PEEKS.map((item, index) => (
            <VenueServiceCard columns={3} {...item} key={`catering-peek-${index}`} />
          ))}
        </View>
      </View>
      <View className="gap-4">
        <CustomLink title="公务餐预定" />
        <View className="flex-row gap-2">
          <ButtonAllinOne label="5月17日" />
          <ButtonAllinOne variant="outline" label="5月18日" />
          <ButtonAllinOne variant="outline" label="5月19日" />
        </View>
        <View style={{ flexWrap: 'wrap' }} className="flex-row justify-center gap-4">
          {CATERING_SERVICES.map((item, index) => (
            <ServiceCard key={`catering-service-${index}`} {...item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CateringTabView;
