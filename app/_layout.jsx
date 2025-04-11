import { SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';

import '../global.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

// import { HoldMenuProvider } from 'react-native-hold-menu';
import { MenuProvider } from 'react-native-popup-menu';
import ModalProvider from 'providers/ModalProvider';
import { Asset } from 'expo-asset';

SplashScreen.preventAutoHideAsync();

const CustomHeaderTitle = () => (
  <View className="flex-row items-center gap-2">
    <Feather name="edit-3" size={20} color="black" />
    <Text className="text-2xl font-medium">新对话</Text>
  </View>
);

export const ContextMenuIcons = [
  require('../assets/imgs/pencil-red.png'),
  require('../assets/imgs/pencil-yellow.png'),
  require('../assets/imgs/pencil-blue.png'),
];

const preloadContextMenuIcons = async () => {
  try {
    await Asset.loadAsync(ContextMenuIcons);
    console.log('Context Menu 图标预加载完成');
  } catch (error) {
    console.error('图标预加载失败:', error);
  }
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    PingFang: require('../assets/fonts/pingfang-sc-regular.ttf'),
  });

  useEffect(() => {
    preloadContextMenuIcons();
  }, []);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && error) return null;

  return (
    <GestureHandlerRootView>
      <ModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="chat"
            options={{ presentation: 'modal', headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen name="videos_id/[vid]" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ headerShown: false }} />
          <Stack.Screen name="search_result/[search_keyword]" options={{ headerShown: false }} />
          <Stack.Screen name="namecard" options={{ headerShown: false }} />
          <Stack.Screen name="newNote" options={{ headerShown: false }} />
        </Stack>
      </ModalProvider>
    </GestureHandlerRootView>
  );
}
