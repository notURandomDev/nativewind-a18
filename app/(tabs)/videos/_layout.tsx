import { View, Text } from 'react-native';
import React from 'react';
import { MaterialTopTabs } from 'components/MaterialTopTabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MyTabBar from 'components/MyTabBar';

const StreamLayout = () => {
  return (
    <SafeAreaView className="relative flex-1 bg-white" edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={['rgba(21, 86, 240, 0.25)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']}
        locations={[0, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <MaterialTopTabs
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#1556F0',
            height: 2,
            /*  width: 30,
               marginLeft: 22, */
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
        <MaterialTopTabs.Screen name="index" options={{ title: '会议直播' }} />
        <MaterialTopTabs.Screen name="replay" options={{ title: '会议回放' }} />
        <MaterialTopTabs.Screen name="[id]" options={{}} />
      </MaterialTopTabs>

      <StatusBar style="dark" backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default StreamLayout;
