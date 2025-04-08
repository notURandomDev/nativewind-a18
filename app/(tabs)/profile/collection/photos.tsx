import {
  FlatList,
  ImageBackground,
  ImageRequireSource,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

const DATA = [
  {
    imgsrc: require('../../../../assets/imgs/photo-1.png'),
    stars: 55,
    likes: 79,
    views: 1031,
  },
  {
    imgsrc: require('../../../../assets/imgs/photo-2.png'),
    stars: 55,
    likes: 79,
    views: 1031,
  },
  {
    imgsrc: require('../../../../assets/imgs/photo-3.png'),
    stars: 55,
    likes: 79,
    views: 1031,
  },
  {
    imgsrc: require('../../../../assets/imgs/photo-5.png'),
    stars: 55,
    likes: 79,
    views: 1031,
  },
  {
    imgsrc: require('../../../../assets/imgs/photo-4.png'),
    stars: 55,
    likes: 79,
    views: 1031,
  },
  {
    imgsrc: require('../../../../assets/imgs/photo-6.png'),
    stars: 55,
    likes: 79,
    views: 1031,
  },
];

export interface PhotoCardProps {
  imgsrc: ImageRequireSource;
  stars: number;
  likes: number;
  views: number;
}

export const splitImages2Columns = (imgs: PhotoCardProps[]) => {
  const leftColumnImgs: PhotoCardProps[] = [];
  const rightColumnImgs: PhotoCardProps[] = [];
  imgs.forEach((img, index) => {
    if (index % 2 === 0) {
      leftColumnImgs.push(img);
    } else {
      rightColumnImgs.push(img);
    }
  });

  return { leftColumnImgs, rightColumnImgs };
};

const Photos = () => {
  const { leftColumnImgs, rightColumnImgs } = splitImages2Columns(DATA);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 12 }}
      contentContainerClassName="flex-row gap-2"
      style={{ paddingHorizontal: 24 }}
      className="flex-1">
      <View className="flex-1 gap-2">
        {leftColumnImgs.map((item, index) => (
          <PhotoCard key={`photo-${index}-l`} {...item} />
        ))}
      </View>
      <View className="flex-1 gap-2">
        {rightColumnImgs.map((item, index) => (
          <PhotoCard key={`photo-${index}-r`} {...item} />
        ))}
      </View>
    </ScrollView>
  );
};

export const PhotoCard = ({ imgsrc, stars, views, likes }: PhotoCardProps) => {
  const [imgHeight, setImgHeight] = useState(0);
  return (
    <ImageBackground
      onLoad={({ nativeEvent }) => {
        setImgHeight(nativeEvent.source.height);
      }}
      source={imgsrc}
      imageStyle={{ width: '100%', height: imgHeight, borderRadius: 16 }}
      className="justify-between"
      style={{ height: imgHeight, width: '100%' }}>
      <Views views={views} />
      <View className="flex-row justify-between">
        <Stars stars={stars} />
        <Likes likes={likes} />
      </View>
    </ImageBackground>
  );
};

const Views = ({ views }: { views: number }) => (
  <View style={{ paddingVertical: 8 }} className="flex-row items-center gap-1 px-4">
    <Ionicons size={16} name="eye-outline" color="#ffffff" />
    <Text className="text-white">{views}</Text>
  </View>
);

const Stars = ({ stars }: { stars: number }) => (
  <View style={{ paddingVertical: 8 }} className="flex-row items-center gap-1 px-4">
    <Ionicons size={16} name="star" color="#1556f0" />
    <Text className="text-white">{stars}</Text>
  </View>
);

const Likes = ({ likes }: { likes: number }) => (
  <View style={{ paddingVertical: 8 }} className="flex-row items-center gap-1 px-4">
    <Ionicons size={16} name="heart-outline" color="#ffffff" />
    <Text className="text-white">{likes}</Text>
  </View>
);

export default Photos;
