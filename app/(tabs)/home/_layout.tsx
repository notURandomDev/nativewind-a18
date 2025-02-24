import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import React from 'react';

import '../../../global.css';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const HomeLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <MaterialTopTabs
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#000000',
            height: 3,
          },
        }}>
        <MaterialTopTabs.Screen name="index" options={{ title: '发现' }} />
        <MaterialTopTabs.Screen name="trending" options={{ title: '热点' }} />
      </MaterialTopTabs>

      <StatusBar style="auto" backgroundColor="#ffffff" />
    </SafeAreaView>
  );
};

export default HomeLayout;
