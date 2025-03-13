import { SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';

import '../global.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

SplashScreen.preventAutoHideAsync();

const CustomHeaderTitle = () => (
  <View className="flex-row items-center gap-2">
    <Feather name="edit-3" size={20} color="black" />
    <Text className="text-2xl font-medium">新对话</Text>
  </View>
);

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    PingFang: require('../assets/fonts/pingfang-sc-regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && error) return null;

  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
