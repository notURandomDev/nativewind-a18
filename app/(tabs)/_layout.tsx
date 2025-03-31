import { View, Text, Image } from 'react-native';
import React, { ReactNode } from 'react';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';

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
        component={() => (
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
        )}
      />
    </Drawer.Navigator>
  );
};

const DrawerLayout = () => (
  <DrawerContentScrollView style={{ position: 'relative', flexGrow: 1 }}>
    <LinearGradient
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        borderWidth: 1,
        flexGrow: 1,
      }}
      colors={['#1556f050', '#ffffff00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
    <OptionItem icon={<Ionicons name="settings-outline" />} label="邀请好友入会" />
  </DrawerContentScrollView>
);

const OptionItem = ({ icon, label }: { icon: ReactNode; label: string }) => (
  <View className="flex-row">
    {icon}
    <Text>asdf</Text>
  </View>
);

export default TabLayout;
