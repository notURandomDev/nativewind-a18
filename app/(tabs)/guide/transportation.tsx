import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { ServiceCard } from 'components/ServiceCard';

const TRANSPORTATION_SERVICE_CARDS = [
  { label: '行李寄存', source: require('../../../assets/imgs/service-route.png') },
  { label: '签到流程', source: require('../../../assets/imgs/service-time.png') },
  { label: '胸卡领取', source: require('../../../assets/imgs/service-elevator.png') },
  { label: '差旅报销', source: require('../../../assets/imgs/service-car.png') },
];

const TransportationTabView = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      <View className="gap-4">
        <CustomLink title="智能地图" />
      </View>
      <View className="gap-4">
        <CustomLink title="接驳服务" />
        <View className="flex-row gap-2">
          <ButtonAllinOne label="5月17日" />
          <ButtonAllinOne variant="outline" label="5月18日" />
          <ButtonAllinOne variant="outline" label="5月19日" />
        </View>
      </View>
      <View style={{ flexWrap: 'wrap' }} className="flex-row justify-center gap-4">
        {TRANSPORTATION_SERVICE_CARDS.map((data, index) => (
          <ServiceCard key={`accessibility-card-${index}`} {...data} />
        ))}
      </View>
    </ScrollView>
  );
};

export default TransportationTabView;
