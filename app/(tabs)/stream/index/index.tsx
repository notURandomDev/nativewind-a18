import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';
import Avatar from 'components/Avatar';
import Accordion from 'components/Accordion';
import Heading from 'components/Heading';

const DetailsView = () => {
  const Heading4Hosts = () => {
    return <Heading icon={<Ionicons name="person-outline" size={20} />}>会议主持人</Heading>;
  };
  const Heading4Guests = () => {
    return <Heading icon={<Ionicons name="people-outline" size={20} />}>会议嘉宾</Heading>;
  };

  const hostsData = [
    { label: '主持人姓名1', sublabel: '主持人1' },
    { label: '主持人姓名2', sublabel: '主持人2' },
    { label: '主持人姓名3', sublabel: '主持人3' },
    { label: '主持人姓名4', sublabel: '主持人4' },
    { label: '主持人姓名5', sublabel: '主持人5' },
  ];
  const guestsData = [
    { label: '嘉宾姓名1', sublabel: '嘉宾1' },
    { label: '嘉宾姓名2', sublabel: '嘉宾2' },
    { label: '嘉宾姓名3', sublabel: '嘉宾3' },
    { label: '嘉宾姓名4', sublabel: '嘉宾4' },
    { label: '嘉宾姓名5', sublabel: '嘉宾5' },
  ];

  return (
    <View className="flex rounded-xl border border-gray bg-blue-faint p-5">
      <View
        accessibilityLabel="1st-layout-lr"
        className="flex-row justify-between border-b border-gray">
        <View accessibilityLabel="left-info">
          <View accessibilityLabel="block-meeting-time" className="gap-1 border-b border-gray pb-4">
            <Heading icon={<Ionicons name="time-outline" size={20} />}>会议时间</Heading>
            <View accessibilityLabel="content-meeting-time">
              <Text className="text-lg font-light">2025年5月18日（星期天）</Text>
              <Text className="text-lg font-light">13:30-17:30</Text>
            </View>
          </View>
          <View accessibilityLabel="block-meeting-venue" className="gap-1 py-4">
            <Heading icon={<Ionicons name="location-outline" size={20} />}>会议地点</Heading>
            <View accessibilityLabel="content-meeting-venue">
              <Text className="text-lg font-light">杭州国际博览中心一层</Text>
              <Text className="text-lg font-light">103B-103C</Text>
            </View>
          </View>
        </View>
        <View accessibilityLabel="right-qr-code" className="items-center gap-1">
          <Image
            className="rounded-xl border border-gray"
            source={require('../../../../assets/imgs/qr-code-example.png')}
          />
          <Text className="text-gray-solid text-sm font-light">打开APP·扫一扫快速入会</Text>
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
