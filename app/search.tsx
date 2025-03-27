import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyTextInput from 'components/MyTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TouchableIcon from 'components/TouchableIcon';
import { router } from 'expo-router';
import ButtonAllinOne from 'components/ButtonAllinOne';

const HISTORY_TAGS = ['AI', '安恒大模型', '服务', '开发者', '服务', '全球领先', '安恒大模型'];
const RECOMM_OPTIONS = [
  'AI引领数字安全新浪潮',
  '人工智能发展与安全',
  '企业数字化与数据出海',
  'AI新质生产力大模型认知',
  '西湖论剑12周年',
  '安恒大模型',
];

const HEATED_TOPICS = [
  { topic: 'AI引领数字安全新浪潮', views: '2.1万' },
  { topic: '主论坛及开幕式', views: '1.9万' },
  { topic: 'AI·引领 智·启新程安恒大模型试用', views: '1.8万' },
];

const LinearGradient4Page = () => (
  <LinearGradient
    colors={['rgba(21, 86, 240, 0.25)', 'rgba(255, 255, 255, 0)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 256,
    }}
  />
);

const LinearGradient4Item1 = () => (
  <LinearGradient
    locations={[0, 0.32, 1]}
    colors={['#1556f050', '#90aff850', '#ffffff']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 16,
      opacity: 0.5,
    }}
  />
);
const LinearGradient4Item2 = () => (
  <LinearGradient
    colors={['#158AF030', '#ffffff']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 16,
      opacity: 0.4,
    }}
  />
);

const Search = () => {
  return (
    <SafeAreaView className="relative flex-1 gap-4 bg-white p-4">
      <LinearGradient4Page />
      <View className="flex-row items-center gap-3">
        <TouchableIcon onPress={() => router.back()}>
          <Ionicons size={30} name="chevron-back-outline" />
        </TouchableIcon>
        <View className="flex-1">
          <MyTextInput
            size="sm"
            icon={<Ionicons size={20} color="#8B8B8B" name="search-outline" />}
            placeholder="西湖论剑"
          />
        </View>
      </View>
      <View className="gap-3 p-2">
        <Text className="text-xl font-medium">历史记录</Text>
        <View style={{ flexWrap: 'wrap' }} className="flex-row gap-3">
          {HISTORY_TAGS.map((tag) => (
            <View
              className="items-center justify-center rounded-2xl border bg-white px-2 py-1"
              style={{ borderColor: '#9F9F9F', minWidth: 40 }}>
              <Text className="text-lg font-light">{tag}</Text>
            </View>
          ))}
          <View
            className="items-center justify-center rounded-2xl border bg-white px-2 py-1"
            style={{ borderColor: '#9F9F9F', minWidth: 35 }}>
            <Ionicons name="chevron-down-outline" />
          </View>
        </View>
      </View>
      <View className="gap-3 p-2">
        <Text className="text-xl font-medium ">猜你想搜</Text>
        <View style={{ flexWrap: 'wrap' }} className="flex-row gap-3">
          {RECOMM_OPTIONS.map((option) => (
            <View style={{ width: '48%' }} className="justify-center">
              <Text className="text-lg font-light">{option}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="gap-3 p-2">
        <Text className="text-xl font-medium text-blue">大会热点</Text>
        {HEATED_TOPICS.map(({ topic, views }, index) => (
          <View className="relative flex-row items-center justify-between rounded-2xl px-3 py-2">
            {index === 2 ? <LinearGradient4Item2 /> : <LinearGradient4Item1 />}
            <View className="flex-row gap-2">
              <Text style={{ width: 32 }} className="text-lg text-blue">
                No.{index + 1}
              </Text>
              <Text className="text-lg font-light">{topic}</Text>
            </View>
            <Text style={{ color: '#9F9F9F' }}>{views}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Search;
