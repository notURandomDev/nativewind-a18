import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';
import Avatar from 'components/Avatar';
import Accordion from 'components/Accordion';
import Heading from 'components/Heading';

const DetailsView = () => {
  const Heading4Hosts = () => {
    return (
      <Heading icon={<Ionicons name="person-outline" size={20} color="#1556f0" />}>
        会议主持人
      </Heading>
    );
  };
  const Heading4Guests = () => {
    return (
      <Heading icon={<Ionicons name="people-outline" size={20} color="#1556f0" />}>
        会议嘉宾
      </Heading>
    );
  };

  const hostsData = [
    { label: '茅莹', sublabel: '浙江经视主持人' },
    { label: '范渊', sublabel: '安恒信息董事长' },
    { label: '刘博', sublabel: '安恒信息CTO' },
  ];
  const guestsData = [
    { label: '范渊', sublabel: '安恒信息董事长' },
    { label: '唐刚', sublabel: '中国软件评测中心副主任、数据安全关键技术与产业应用评价工...' },
    { label: '周宇', sublabel: '杭州数据交易所董事长兼总经理' },
    { label: '刘博', sublabel: '安恒信息CTO' },
    { label: '詹巍', sublabel: '浙江天策律师事务所合伙人' },
    { label: '魏琴', sublabel: '立信会计事务所(特殊普通合伙)浙江分所合伙人' },
    { label: '程永海', sublabel: '银信资产评估有限公司浙江分公司总经理' },
    { label: '俞能海', sublabel: '中国科学技术大学网络空间安全学院执行院长' },
    { label: '朱浩齐', sublabel: '网易智企副总经理、网易易盾总经理' },
    { label: '侯黎明', sublabel: '人民中科总裁' },
    { label: '张娜', sublabel: '中科闻歌副总经理' },
    { label: '王欣', sublabel: '杭州人工智能学会副秘书长、安恒研究院院长' },
  ];

  return (
    <View className="flex rounded-xl  bg-blue-faint p-5">
      <View
        accessibilityLabel="1st-layout-lr"
        className="flex-row justify-between border-b border-gray">
        <View accessibilityLabel="left-info">
          <View accessibilityLabel="block-meeting-time" className="gap-1 border-b border-gray pb-4">
            <Heading icon={<Ionicons name="time-outline" size={20} color="#1556f0" />}>
              会议时间
            </Heading>
            <View accessibilityLabel="content-meeting-time">
              <Text className="text-lg font-medium">2025年5月17日</Text>
              <Text className="text-lg font-medium">14:30-17:20</Text>
            </View>
          </View>
          <View accessibilityLabel="block-meeting-venue" className="gap-1 py-4">
            <Heading icon={<Ionicons name="location-outline" size={20} color="#1556f0" />}>
              会议地点
            </Heading>
            <View accessibilityLabel="content-meeting-venue">
              <Text className="text-lg font-medium">杭州国际博览中心</Text>
              <Text className="text-lg font-medium">102B/C</Text>
            </View>
          </View>
        </View>
        <View accessibilityLabel="right-qr-code" className="items-center gap-1">
          <Image
            className="rounded-xl"
            source={require('../../../../assets/imgs/qr-code-example.png')}
          />
          <Text className="text-sm font-light text-gray-solid">打开APP·扫一扫快速入会</Text>
        </View>
      </View>
      <View accessibilityLabel="2nd-layout-hosts" className="border-b border-gray py-5">
        <Accordion headingComponent={<Heading4Hosts />} itemsData={hostsData} />
      </View>
      <View accessibilityLabel="3rd-layout-guests" className="pb-1 pt-5">
        <Accordion headingComponent={<Heading4Guests />} itemsData={guestsData} />
      </View>
    </View>
  );
};

export default DetailsView;
