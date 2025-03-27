import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1556F0',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '首页',
          tabBarIcon: ({ color, focused }) =>
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
          tabBarIcon: ({ color, focused }) =>
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
          tabBarIcon: ({ color, focused }) =>
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
        name="subscriptions"
        options={{
          title: '智能笔记',
          tabBarIcon: ({ color, focused }) =>
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
          tabBarIcon: ({ color, focused }) =>
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
};

export default TabLayout;
