import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { replayRecommendations } from 'data/cards';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';
import Speeches from './speeches';
import News from './news';
import Videos from './videos';
import Photos from './photos';

const SwitchConfigs = [
  { label: '大咖演讲' },
  { label: '新闻前线' },
  { label: '精彩视频' },
  { label: '精彩图片' },
];

const Views = [<Speeches />, <News />, <Videos />, <Photos />];

const CollectionTabLayout = () => {
  const [buttonIndex, setButtonIndex] = useState(0);

  return (
    <View className="flex-1 gap-4">
      <View className="flex-row gap-2" style={{ paddingHorizontal: 24 }}>
        {SwitchConfigs.map(({ label }, index) => (
          <ButtonAllinOne
            onPress={() => setButtonIndex(index)}
            variant={index === buttonIndex ? 'solid' : 'outline'}
            key={`subscrption-button-${index}`}
            label={label}
          />
        ))}
      </View>
      {Views[buttonIndex]}
    </View>
  );
};

export default CollectionTabLayout;
