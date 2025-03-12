import { View, Text, ImageBackground, ImageSourcePropType } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

interface VideoThumbnailProps {
  views?: number;
  duration?: string;
  imgSrc?: ImageSourcePropType;
}

const VideoThumbnail = ({ views, duration, imgSrc }: VideoThumbnailProps) => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 8.7 }}
      className="relative rounded-xl"
      style={{
        padding: 6,
        height: 82,
        width: 140,
        borderRadius: 8.7,
        justifyContent: 'space-between',
      }}
      source={imgSrc}>
      <LinearGradient
        colors={['#6d6d6d00', '#000000']}
        locations={[0, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 8.7,
        }}
      />
      <View>
        {views && (
          <View className="flex-row items-center gap-1 pl-1">
            <Ionicons name="eye-outline" color="#ffffff" />
            <Text className="text-sm text-white">{views}人次</Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
        <Text className="text-sm font-light text-white">{duration}</Text>
      </View>
    </ImageBackground>
  );
};

export default VideoThumbnail;
