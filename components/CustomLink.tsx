import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

interface CustomLinkProps {
  title?: string;
  subtitle?: string;
  link?: string;
}

const CustomLink = ({ title = 'Default Heading', subtitle, link = '/' }: CustomLinkProps) => {
  return (
    <Link replace asChild href={link}>
      <TouchableOpacity className="flex-row items-center justify-between">
        <View className="flex-row items-baseline">
          <View className="relative">
            <View className="bg- bg-yellow absolute bottom-0 left-0 right-0 h-2 rounded-sm"></View>
            <Text className="text-3xl font-normal">{title}</Text>
          </View>
          {subtitle && <Text className="text-lg font-light">/{subtitle}</Text>}
        </View>
        <Ionicons name="chevron-forward-outline" size={20} />
      </TouchableOpacity>
    </Link>
  );
};

export default CustomLink;
