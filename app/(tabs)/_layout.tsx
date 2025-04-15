import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';
import { Link, router, Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

const Drawer = createDrawerNavigator();

const TabLayout = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerLayout}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="tabs"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
        component={TabsLayout}
      />
    </Drawer.Navigator>
  );
};

const TabsLayout = () => (
  <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#1556F0',
    }}>
    <Tabs.Screen
      name="home"
      options={{
        title: '首页',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/home-active.png')}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/home-inactive.png')}
            />
          ),
      }}
    />
    <Tabs.Screen
      name="guide"
      options={{
        title: '参会指南',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/guide-active.png')}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/guide-inactive.png')}
            />
          ),
      }}
    />
    <Tabs.Screen
      name="videos"
      options={{
        title: '大会视频',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/video-active.png')}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/video-inactive.png')}
            />
          ),
      }}
    />
    <Tabs.Screen
      name="notes"
      options={{
        title: '智能笔记',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/notes-active.png')}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/notes-inactive.png')}
            />
          ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: '我的',
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/profile-active.png')}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../assets/imgs/indicators/profile-inactive.png')}
            />
          ),
      }}
    />
  </Tabs>
);

const DrawerLayout = () => (
  <DrawerContentScrollView
    scrollEnabled={false}
    contentContainerStyle={{ flex: 1, paddingTop: 45 }}
    style={{ position: 'relative' }}>
    <LinearGradient
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      colors={['#1556f050', '#ffffff00']}
    />
    <View style={{ marginBottom: 8 }} className="flex-row items-center justify-between py-2">
      <View style={{ gap: 8, paddingStart: 4 }} className="flex-row items-center">
        <Image
          className="rounded-full"
          style={{ width: 35, aspectRatio: 1 }}
          source={require('../../assets/imgs/boss.jpg')}
        />
        <Text className="text-2xl font-medium">范渊</Text>
      </View>
      <View style={{ gap: 20 }} className="flex-row items-center">
        <MaterialCommunityIcons name="line-scan" size={24} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}>
          <Ionicons size={24} name="chevron-forward-outline" />
        </TouchableOpacity>
      </View>
    </View>

    <OptionContainer>
      <OptionItem
        path="../../namecard"
        icon={<Ionicons size={20} name="person-add-outline" />}
        label="邀请好友参会"
      />
    </OptionContainer>

    <OptionContainer>
      <OptionItem icon={<Ionicons size={20} name="settings-outline" />} label="设置" />
      <OptionItem icon={<Ionicons size={20} name="person-circle-outline" />} label="修改个人资料" />
      <OptionItem icon={<Ionicons size={20} name="help-circle-outline" />} label="帮助与客服" />
    </OptionContainer>

    <OptionContainer>
      <OptionItem icon={<Ionicons size={20} name="eye-outline" />} label="浏览记录" />
    </OptionContainer>
  </DrawerContentScrollView>
);

const OptionContainer = (props: { children: ReactNode }) => (
  <View
    style={{ borderRadius: 17, marginBottom: 20, borderWidth: 1, borderColor: '#E8E8E8' }}
    className="bg-white">
    {props.children}
  </View>
);

const OptionItem = ({ icon, label, path }: { icon: ReactNode; label: string; path?: string }) => (
  <TouchableOpacity activeOpacity={1} onPress={() => (path ? router.push(path) : {})}>
    <View style={{ borderRadius: 17 }} className="flex-row items-center gap-2  p-4">
      {icon}
      <Text className="text-xl font-light">{label}</Text>
    </View>
  </TouchableOpacity>
);

export default TabLayout;
