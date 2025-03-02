import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '首页',
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: '指南',
        }}
      />
      <Tabs.Screen
        name="stream"
        options={{
          title: '直播',
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: '订阅',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
