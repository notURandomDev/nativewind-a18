import { View, Text, ScrollView, ImageSourcePropType, Image, ImageBackground } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { LinearGradient } from 'expo-linear-gradient';
import { ServiceCard, ServiceCardProps, VenueServiceCard } from 'components/ServiceCard';

const VENUE_SERVICE_DATA = [
  { label: '行李寄存', source: require('../../../assets/imgs/service-baggage.png') },
  { label: '签到流程', source: require('../../../assets/imgs/service-checkin.png') },
  { label: '胸卡领取', source: require('../../../assets/imgs/service-badge.png') },
  { label: '差旅报销', source: require('../../../assets/imgs/service-reimburse.png') },
];

const VENUE_ACCESSIBILITY_DATA = [
  { label: '无障碍通道', source: require('../../../assets/imgs/service-passage.png') },
  { label: '优先座位区', source: require('../../../assets/imgs/service-seat.png') },
  { label: '无障碍电梯', source: require('../../../assets/imgs/service-elevator.png') },
  { label: '无障碍卫生间', source: require('../../../assets/imgs/service-wc.png') },
];

const VenueTabView = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      <View className="gap-4">
        <CustomLink title="会场分布" />
        <View className="flex-row gap-2">
          <ButtonAllinOne label="5月17日" />
          <ButtonAllinOne variant="outline" label="5月18日" />
          <ButtonAllinOne variant="outline" label="5月19日" />
        </View>
        <Image
          resizeMode="contain"
          style={{ flex: 1, width: null, height: 145 }}
          source={require('../../../assets/imgs/service-table.png')}
        />
      </View>
      <View className="gap-4">
        <CustomLink title="会场服务" />
        <View className="flex-row gap-4">
          {VENUE_SERVICE_DATA.map((service, index) => (
            <VenueServiceCard {...service} key={`venue-service-${index}`} />
          ))}
        </View>
      </View>
      <View className="gap-4">
        <CustomLink title="无障碍服务" />
        <View className="flex-row gap-2">
          <ButtonAllinOne label="通行无障碍" />
          <ButtonAllinOne variant="outline" label="信息无障碍" />
          <ButtonAllinOne variant="outline" label="服务无障碍" />
          <ButtonAllinOne variant="outline" label="沟通无障碍" />
        </View>
        <View style={{ flexWrap: 'wrap' }} className="flex-row justify-center gap-4">
          {VENUE_ACCESSIBILITY_DATA.map((data, index) => (
            <ServiceCard key={`accessibility-card-${index}`} {...data} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default VenueTabView;
