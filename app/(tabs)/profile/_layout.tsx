import { View, Text, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialTopTabs } from 'components/MaterialTopTabs';
import MyTabBar from 'components/MyTabBar';
import { StatusBar } from 'expo-status-bar';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfileLayout = () => {
  return (
    <SafeAreaView className="relative flex-1 bg-white" edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={['#1556F050', '#ffffff00']}
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
      <View className="gap-4 p-4">
        <View className="flex-row justify-between">
          <View>
            <Ionicons size={24} name="menu-outline" />
          </View>
          <View style={{ gap: 20 }} className="flex-row">
            <Ionicons size={24} name="scan-outline" />
            <Ionicons size={24} name="settings-outline" />
            <Ionicons size={24} name="share-social-outline" />
          </View>
        </View>
        <View className="flex-row gap-4">
          <Image
            className="rounded-full"
            resizeMode="contain"
            style={{ width: '25%', aspectRatio: 1 }}
            source={require('../../../assets/imgs/boss.jpg')}
          />
          <View className="flex-1 justify-center gap-3">
            <Text className="text-3xl font-medium">范渊</Text>
            <View className="gap-1">
              <Text className="font-light text-gray-solid">UID：FanYuanisOurBoss</Text>
              <Text className="font-light text-gray-solid">IP属地：浙江</Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-2">
          <ButtonAllinOne
            textColor="text-gray-solid"
            borderColor="border-gray-solid"
            disabled
            rounded="full"
            variant="outline"
            label="南京邮电大学"
          />
          <ButtonAllinOne
            textColor="text-gray-solid"
            borderColor="border-gray-solid"
            disabled
            rounded="full"
            variant="outline"
            label="安恒董事长"
          />
        </View>
      </View>
      <MaterialTopTabs
        tabBar={(props) => <MyTabBar variant="mini" {...props} />}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#1556F0',
            height: 2,
          },
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#1556F0',
          tabBarLabelStyle: {
            fontSize: 22,
          },
          tabBarGap: 0,
          sceneStyle: {
            backgroundColor: 'transparent',
          },
        }}>
        <MaterialTopTabs.Screen name="index" options={{ title: '订阅' }} />
        <MaterialTopTabs.Screen name="collection" options={{ title: '收藏' }} />
        <MaterialTopTabs.Screen name="downloads" options={{ title: '下载' }} />
        <MaterialTopTabs.Screen name="history" options={{ title: '浏览' }} />
      </MaterialTopTabs>

      <StatusBar style="dark" backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default ProfileLayout;
