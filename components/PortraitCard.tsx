import { View, Text, ImageBackground, ImageSourcePropType } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface PortraitCardProps {
  title?: string;
  subtitle?: string;
  label?: string;
  img?: ImageSourcePropType;
  variant?: 'default' | 'square';
  alignMode?: 'left' | 'center';
  size?: number;
  isFile?: boolean;
}

const PortraitCard = ({
  title,
  subtitle,
  label,
  img,
  variant = 'default',
  alignMode = 'left',
  size,
  isFile = false,
}: PortraitCardProps) => {
  const imageDimensions = {
    // default: { height: 180, width: 130 },
    default: { height: 150, width: 110 },
    square: size ? { height: size, width: size } : { height: 64, width: 64 },
  };

  const alignStyles = {
    left: 'items-start',
    center: 'items-center',
  };

  return (
    <ImageBackground
      className={`justify-end ${alignStyles[alignMode]}`}
      imageStyle={{ borderRadius: 17 }}
      style={[
        {
          paddingHorizontal: 10,
          paddingVertical: 8,
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
        {title && (
          <Text className={`${variant === 'default' ? 'text-lg' : 'text-sm'} text-white`}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            style={{ fontSize: variant === 'default' ? 10 : 7 }}
            className="text-white"
            numberOfLines={1}>
            {subtitle}
          </Text>
        )}
        {label && (
          <Text numberOfLines={1} className="text-sm text-white">
            {label}
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default PortraitCard;
