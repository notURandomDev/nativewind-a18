import { TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';

const ChatActivator = ({ href }: { href: string }) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        activeOpacity={1}
        className="absolute items-center justify-center"
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          top: 390,
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
          source={require('assets/imgs/favicon-notext.png')}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default ChatActivator;
