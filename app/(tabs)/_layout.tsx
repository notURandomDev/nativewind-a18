import { View, Text } from 'react-native';
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
          tabBarIcon: ({ color }) => <Ionicons size={20} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: '参会指南',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="document-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: '大会视频',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="videocam-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: '智能笔记',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="book-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="person-outline" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
