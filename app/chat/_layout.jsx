import { Link, router, Stack } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';

import { Image, Text, View } from 'react-native';
import ButtonAllinOne from 'components/ButtonAllinOne';

const CustomChatHeader = () => (
  <View className="flex-row justify-between bg-white px-2 py-3">
    <ButtonAllinOne variant="ghost" onPress={() => router.back()}>
      <Ionicons size={22} name="chevron-back-outline" />
    </ButtonAllinOne>
    <View className="flex-row items-center gap-2">
      <Feather name="edit-3" size={20} color="black" />
      <Text className="text-2xl font-medium">新对话</Text>
    </View>
    <ButtonAllinOne variant="ghost" onPress={() => router.replace('/chat/history')}>
      <Octicons name="history" size={22} />
    </ButtonAllinOne>
  </View>
);

const CustomChatHistoryHeader = () => (
  <View className="flex-row justify-between bg-white px-2 py-3">
    <ButtonAllinOne variant="ghost" onPress={() => router.replace('/chat')}>
      <Ionicons size={22} name="chevron-back-outline" />
    </ButtonAllinOne>
    <View className="flex-row items-center gap-2">
      <Text className="text-2xl font-medium">安小恒的对话记录</Text>
    </View>
    <ButtonAllinOne variant="ghost">
      <Octicons color="#ffffff" name="history" size={22} />
    </ButtonAllinOne>
  </View>
);

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          animation: 'none',
          presentation: 'modal',
          headerShadowVisible: false,
          headerBackVisible: true,
          header: () => <CustomChatHeader />,
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          animation: 'none',
          headerShadowVisible: false,
          headerBackVisible: true,
          header: () => <CustomChatHistoryHeader />,
        }}
      />
    </Stack>
  );
}
