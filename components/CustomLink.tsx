import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomLinkProps {
  title?: string;
  link?: string;
}

const CustomLink = ({ title = 'Default Heading', link = '/' }: CustomLinkProps) => {
  return (
    <Link replace asChild href={link}>
      <TouchableOpacity className="flex-row items-center justify-between px-2">
        <Text className="text-3xl font-normal">{title}</Text>
        <Ionicons name="chevron-forward-outline" size={20} />
      </TouchableOpacity>
    </Link>
  );
};

export default CustomLink;
