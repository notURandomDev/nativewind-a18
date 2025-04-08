import { ScrollView, View } from 'react-native';
import React from 'react';
import { PhotoCard, splitImages2Columns } from '../collection/photos';

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

const Images = () => {
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

export default Images;
