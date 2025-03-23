import { View, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { ReactNode, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomVideoView from 'components/CustomVideoView';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import MyTabBar from 'components/MyTabBar';
import BottomIndicator from 'components/BottomIndicator';

// Create the Material Top Tab Navigator
const Tab = createMaterialTopTabNavigator();

// Export the enhanced navigator with layout context
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Tab.Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Tab.Navigator);

const Explore = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1 bg-black">
        <View className="flex items-center bg-black">
          <CustomVideoView />
        </View>
        <View className="h-full bg-white">
          <View className="flex-row justify-between border-b border-gray px-8 py-5">
            <View className="max-w-72">
              <Text className="text-2xl font-medium">2025西湖论剑暨安恒信息年度新品发布日</Text>
            </View>
            <View className="w-1/6 items-center justify-center">
              <TouchableOpacity className="flex-row items-center gap-0.5 rounded-3xl border px-3 py-0.5">
                <Ionicons name="star-outline" size={14} />
                <Text className="text-lg font-medium">收藏</Text>
              </TouchableOpacity>
            </View>
          </View>
          <MaterialTopTabs
            tabBar={(props) => <MyTabBar {...props} variant="mini" />}
            initialRouteName="index"
            screenOptions={{
              sceneStyle: { backgroundColor: '#ffffff' },
              tabBarIndicatorStyle: {
                backgroundColor: '#1556F0',
                height: 3,
              },
              tabBarLabelStyle: {
                fontSize: 18,
                fontWeight: '500',
              },
            }}>
            <MaterialTopTabs.Screen name="index" options={{ title: '详情' }} />
            <MaterialTopTabs.Screen name="digest" options={{ title: '摘要' }} />
            <MaterialTopTabs.Screen name="notes" options={{ title: '笔记', swipeEnabled: false }} />
            <MaterialTopTabs.Screen name="recommend" options={{ title: '推荐' }} />
            <MaterialTopTabs.Screen name="chat" options={{ title: '聊天' }} />
          </MaterialTopTabs>
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export const TabPageLayout = ({ children }: { children: ReactNode }) => (
  <ScrollView
    contentContainerStyle={{
      display: 'flex',
      flexGrow: 1,
      gap: 12,
      backgroundColor: '#fffff1',
      paddingHorizontal: 28,
      paddingBottom: 245,
      position: 'relative',
    }}>
    {children}
    <BottomIndicator />
  </ScrollView>
);

export default Explore;
