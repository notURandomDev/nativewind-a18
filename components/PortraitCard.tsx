import { View, Text, ImageBackground, ImageSourcePropType } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface PortraitCardProps {
  title?: string;
  subtitle?: string;
  img?: ImageSourcePropType;
  variant?: 'default' | 'square';
}

const PortraitCard = ({
  title = '标题',
  subtitle = '副标题',
  img,
  variant = 'default',
}: PortraitCardProps) => {
  const imageDimensions = {
    default: { height: 130, width: 100 },
    square: { height: 100, width: 100 },
  };

  return (
    <ImageBackground
      imageStyle={{ borderRadius: 17 }}
      style={[
        {
          justifyContent: 'flex-end',
          paddingHorizontal: 8,
          paddingVertical: 10,
          position: 'relative',
        },
        imageDimensions[variant],
      ]}
      source={img}>
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
