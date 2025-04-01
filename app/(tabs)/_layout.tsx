import { View, Text, Image } from 'react-native';
import React, { ReactNode } from 'react';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from 'components/Avatar';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
  <DrawerContentScrollView
    scrollEnabled={false}
    contentContainerStyle={{ flex: 1 }}
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
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
    <View style={{ marginBottom: 8 }} className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center gap-3">
        <Image
          className="rounded-full"
          style={{ width: 40, aspectRatio: 1 }}
          source={require('../../assets/imgs/lipu.png')}
        />
        <Text className="text-2xl text-white">厘小普</Text>
      </View>
      <View style={{ gap: 20 }} className="flex-row items-center">
        <MaterialCommunityIcons name="line-scan" size={28} color="#ffffff" />
        <Ionicons size={28} name="chevron-forward-outline" color="#ffffff" />
      </View>
    </View>

    <OptionContainer>
      <OptionItem icon={<Ionicons size={20} name="person-add-outline" />} label="邀请好友参会" />
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

const OptionItem = ({ icon, label }: { icon: ReactNode; label: string }) => (
  <View style={{ borderRadius: 17 }} className="flex-row items-center gap-2  p-4">
    {icon}
    <Text className="text-xl font-light">{label}</Text>
  </View>
);

export default TabLayout;
