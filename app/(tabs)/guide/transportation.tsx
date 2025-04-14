import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { ServiceCard } from 'components/ServiceCard';
import { Ionicons } from '@expo/vector-icons';

const TRANSPORTATION_SERVICE_CARDS = [
  { label: '路线查看', source: require('../../../assets/imgs/service-route.png') },
  { label: '班车时刻表', source: require('../../../assets/imgs/service-time.png') },
  { label: '线上预约', source: require('../../../assets/imgs/service-elevator.png') },
  { label: '专车服务', source: require('../../../assets/imgs/service-car.png') },
];

const TransportationTabView = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      <View className="gap-4">
        <CustomLink title="智能地图" />
        <RouteInput />
        <CommutePlan />
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

const RouteInput = () => (
  <View
    style={{ borderRadius: 15, borderWidth: 2.5 }}
    className="flex-row items-center gap-4 border-blue px-3 py-2">
    <View className="flex-1 gap-1.5">
      <View className="flex-row items-center gap-2 ">
        <Ionicons name="ellipse" color="#89EF7A" />
        <Text className="text-xl">杭州东站</Text>
      </View>
      <View style={{ borderWidth: 0.5, marginLeft: 20 }} className="border border-gray"></View>
      <View className="flex-row items-center gap-2 ">
        <Ionicons name="ellipse" color="#F66348" />
        <Text className="text-xl text-gray-solid">杭州国际博览中心</Text>
      </View>
    </View>
    <View>
      <Ionicons name="swap-vertical-outline" size={24} />
    </View>
  </View>
);

const CommutePlan = () => (
  <View style={{ borderRadius: 15 }} className="gap-2 bg-blue-faint px-4 py-2">
    <Text className="text-xl">全程 22分钟</Text>
    <View className="flex-row gap-2">
      <View
        className="flex-1 items-center rounded-lg py-1"
        style={{ backgroundColor: '#1556F050' }}>
        <Text className="text-lg text-white">6号线</Text>
      </View>
      <Ionicons name="walk" size={24} color="#1556F0" />
    </View>
    <Text className="text-gray-solid">共步行210米·4元·7站</Text>
    <View className="items-center">
      <View className="flex-row items-center gap-2">
        <Ionicons name="ellipse" size={7} color="#1556F0" />
        <Ionicons name="ellipse" size={7} color="#D9D9D9" />
        <Ionicons name="ellipse" size={7} color="#D9D9D9" />
        <Ionicons name="ellipse" size={7} color="#D9D9D9" />
      </View>
    </View>
  </View>
);

export default TransportationTabView;
