import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface PortraitCardProps {
  title?: string;
  subtitle?: string;
}

const PortraitCard = ({ title = '标题', subtitle = '副标题' }: PortraitCardProps) => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 17 }}
      style={{
        height: 130,
        width: 100,
        justifyContent: 'flex-end',
        paddingHorizontal: 8,
        paddingVertical: 10,
        position: 'relative',
      }}
      source={require('../assets/imgs/guest-p-1.png')}>
      <LinearGradient
        colors={['#6d6d6d00', '#000000']}
        locations={[0, 1]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 17,
        }}
      />
      <View>
        <Text className="text-lg text-white">{title}</Text>
        <Text style={{ fontSize: 10 }} className="text-white">
          {subtitle}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default PortraitCard;
