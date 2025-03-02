import { View, Text, Image, ImageSourcePropType } from 'react-native';
import React from 'react';

interface AvatarProps {
  source?: ImageSourcePropType;
}

const Avatar = ({ source = require('../assets/imgs/avatar-placeholder.png') }: AvatarProps) => {
  return <Image source={source} />;
};

export default Avatar;
