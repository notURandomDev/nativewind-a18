import { View, Text, ScrollView, ImageSourcePropType, Image } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import { Ionicons } from '@expo/vector-icons';

const NAME_CARDS1 = [
  {
    name: '薛老师',
    title: '安恒员工',
    tel: '13810244613',
    email: 'mia.xue@dbappsecurity.com.cn',
    source: require('../../../assets/imgs/namecard-1.png'),
  },
  {
    name: '陆老师',
    title: '安恒员工',
    tel: '13810244610',
    email: 'canninglu@dbappsecurity.com.cn',
    source: require('../../../assets/imgs/namecard-2.png'),
  },
];

const NAME_CARDS2 = [
  {
    name: '苗老师',
    title: '安恒员工',
    tel: '13810244613',
    email: 'mia.xue@dbappsecurity.com.cn',
    source: require('../../../assets/imgs/namecard-3.png'),
  },
  {
    name: '余老师',
    title: '安恒员工',
    tel: '13810244610',
    email: 'canninglu@dbappsecurity.com.cn',
    source: require('../../../assets/imgs/namecard-4.png'),
  },
];
const NAME_CARDS3 = [
  {
    name: '安队长',
    title: '安恒员工',
    tel: '13810244613',
    email: 'mia.xue@dbappsecurity.com.cn',
    source: require('../../../assets/imgs/namecard-5.png'),
  },
  {
    name: '恒队长',
    title: '安恒员工',
    tel: '13810244610',
    email: 'canninglu@dbappsecurity.com.cn',
    source: require('../../../assets/imgs/namecard-6.png'),
  },
];

interface NameCardProps {
  name: string;
  title: string;
  tel: string;
  email: string;
  source: ImageSourcePropType;
}

const NameCard = ({ name, title, tel, email, source }: NameCardProps) => (
  <View className="flex-row items-baseline justify-between">
    <View className="flex-row gap-4">
      <Image resizeMode="contain" style={{ width: 68, height: 68 }} source={source} />
      <View className="gap-1">
        <View className="flex-row items-baseline">
          <Text className="text-3xl">{name}</Text>
          <Text className="text-sm">/{title}</Text>
        </View>
        <Text className="text-base font-light">联系方式：{tel}</Text>
        <Text className="text-base font-light">邮箱：{email}</Text>
      </View>
    </View>

    <View>
      <Ionicons color="#8B8B8B" size={16} name="ellipsis-vertical" />
    </View>
  </View>
);

const ContactTabView = () => {
  return (
    <ScrollView
      contentContainerClassName="gap-8"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      <View className="gap-4">
        <CustomLink title="会务咨询" />
        {NAME_CARDS1.map((card, index) => (
          <NameCard key={`namecard-1-${index}`} {...card} />
        ))}
      </View>
      <View className="gap-4">
        <CustomLink title="商务合作" />
        {NAME_CARDS2.map((card, index) => (
          <NameCard key={`namecard-2-${index}`} {...card} />
        ))}
      </View>
      <View className="gap-4">
        <CustomLink title="后勤安保部门" />
        {NAME_CARDS3.map((card, index) => (
          <NameCard key={`namecard-3-${index}`} {...card} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ContactTabView;
