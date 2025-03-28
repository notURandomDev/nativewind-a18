import { View, Text, ScrollView, ImageSourcePropType, Image } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';

const HOTELS = [
  {
    name: '杭州英冠索菲持酒店',
    address: '萧山区明星路485号乐创城3幢',
    leader: '叶志君（安恒员工）',
    tel: '13967728940',
    source: require('../../../assets/imgs/hotel-1.png'),
  },
  {
    name: '杭州博奥开元名都酒店',
    address: '萧山区北干街道金城路107号',
    leader: '丁佳（安恒员工）',
    tel: '18957797275',
    source: require('../../../assets/imgs/hotel-2.png'),
  },
  {
    name: '杭州瑞立江河汇酒店',
    address: '上城区之江路1299号',
    leader: '范顺珍（安恒员工）',
    tel: '18858705705',
    source: require('../../../assets/imgs/hotel-3.png'),
  },
  {
    name: '杭州英冠索菲持酒店',
    address: '地址：萧山区明星路485号乐创城3幢',
    leader: '叶志君（安恒员工）',
    tel: '13967728940',
    source: require('../../../assets/imgs/hotel-1.png'),
  },
  {
    name: '杭州博奥开元名都酒店',
    address: '地址：萧山区北干街道金城路107号',
    leader: '丁佳（安恒员工）',
    tel: '18957797275',
    source: require('../../../assets/imgs/hotel-2.png'),
  },
];

interface HotelCardProps {
  name: string;
  address: string;
  leader: string;
  tel: string;
  source: ImageSourcePropType;
}
const HotelCard = ({ name, address, leader, tel, source }: HotelCardProps) => (
  <View className="flex-row gap-4">
    <Image source={source} style={{ width: '40%', height: 90, borderRadius: 17 }} />
    <View className="gap-1.5">
      <Text className="text-2xl">{name}</Text>
      <Text className="text-sm font-light">地址：{address}</Text>
      <Text className="text-sm font-light">组长：{leader}</Text>
      <Text className="text-sm font-light">联系方式：{tel}</Text>
    </View>
  </View>
);

const AccommodationTabView = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      <View className="gap-4">
        <CustomLink title="酒店安排" />
        {HOTELS.map((hotel, index) => (
          <HotelCard key={`hotel-${index}`} {...hotel} />
        ))}
      </View>
    </ScrollView>
  );
};

export default AccommodationTabView;
