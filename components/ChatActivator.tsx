import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { HrefInputParams, Link } from 'expo-router';

const ChatActivator = ({ href }: { href: string }) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        activeOpacity={1}
        className="absolute items-center justify-center"
        style={{
          backgroundColor: '#ffffff',
          top: 360,
          right: 5,
          height: 65,
          width: 65,
          borderRadius: 13,
          borderColor: '#1556f010',
          borderWidth: 2,
        }}>
        <Image
          style={{ height: 40, width: 40 }}
          resizeMode="contain"
          source={require('../assets/imgs/favicon-1.png')}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default ChatActivator;
