import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React, { ReactNode } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

const Namecard = () => {
  return (
    <SafeAreaView
      style={{ paddingHorizontal: 24, gap: 24 }}
      className="relative flex-1 bg-white p-4">
      <LinearGradient
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
        colors={['#1556F050', '#ffffff00']}
      />
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          activeOpacity={1}>
          <Ionicons size={24} name="chevron-back" />
        </TouchableOpacity>
        <View style={{ gap: 20 }} className="flex-row">
          <Ionicons size={24} name="settings-outline" />
          <Ionicons size={24} name="share-social-outline" />
        </View>
      </View>
      <View className="relative items-center" style={{ paddingTop: 36 }}>
        <LinearGradient
          style={{
            width: '85%',
            position: 'absolute',
            top: 0,
            height: 438,
            borderRadius: 17,
          }}
          colors={['#1556F0', '#ffffff00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.4 }}
        />
        <View
          className="w-full bg-white"
          style={{ borderRadius: 17, paddingHorizontal: 32, paddingVertical: 52, gap: 24 }}>
          <Image
            resizeMode="contain"
            className="rounded-full border border-gray"
            style={{ height: 85, aspectRatio: 1 }}
            source={require('../assets/imgs/lipu.png')}
          />
          <View className="gap-2">
            <Text className="text-4xl">黄子烨</Text>
            <Text className="text-lg text-gray-solid">UID: 22050208</Text>
            <Text className="text-lg font-light text-gray-solid">
              我是来自杭州电子科技大学的前端工程师黄子烨！
            </Text>
          </View>
          <View className="border border-gray"></View>
          <View className="flex-row">
            <View className="gap-2" style={{ width: '50%' }}>
              <Image
                style={{ height: 32, width: 135, borderRadius: 8.7 }}
                resizeMode="contain"
                source={require('../assets/imgs/logo-text.png')}
              />
              <View>
                <Text className="text-xl text-gray-solid">扫描二维码</Text>
                <Text className="text-xl text-gray-solid">在安恒智能体找到我</Text>
              </View>
            </View>
            <View className="flex-1 items-end">
              <Image
                className="rounded-lg border border-blue"
                resizeMode="contain"
                source={require('../assets/imgs/qrcode.png')}
                style={{ height: 83, aspectRatio: 1 }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ padding: 24 }} className="flex-row justify-between">
        <View className="items-center gap-8">
          <View style={{ backgroundColor: '#1556F020', borderRadius: 17, padding: 16 }}>
            <Ionicons size={40} name="scan" />
          </View>
          <Text className="text-lg font-medium">扫一扫</Text>
        </View>
        <View className="items-center gap-8">
          <View style={{ backgroundColor: '#1556F020', borderRadius: 17, padding: 16 }}>
            <Ionicons size={40} name="download-outline" />
          </View>
          <Text className="text-lg font-medium">保存到相册</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Namecard;
