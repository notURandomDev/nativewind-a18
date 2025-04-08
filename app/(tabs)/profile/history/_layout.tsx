import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Replays from './replays';
import Streams from './streams';
import Activities from './activities';
import Speeches from './speeches';
import News from './news';
import Videos from './videos';
import Images from './images';
import ButtonAllinOne from 'components/ButtonAllinOne';

const Views = [
  <Replays />,
  <Streams />,
  <Activities />,
  <Speeches />,
  <News />,
  <Videos />,
  <Images />,
];

const SwitchConfigs = [
  { label: '会议回放' },
  { label: '会议直播' },
  { label: '各类活动' },
  { label: '大咖演讲' },
  { label: '新闻前线' },
  { label: '精彩视频' },
  { label: '精彩图片' },
];

const HistoryLayout = () => {
  const [buttonIndex, setButtonIndex] = useState(0);

  return (
    <View className="flex-1 gap-4">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ paddingEnd: 20 }}
        contentContainerClassName="flex-row gap-2"
        style={{ paddingHorizontal: 20, flexGrow: 0 }}>
        {SwitchConfigs.map(({ label }, index) => (
          <ButtonAllinOne
            onPress={() => setButtonIndex(index)}
            variant={index === buttonIndex ? 'solid' : 'outline'}
            key={`subscrption-button-${index}`}
            label={label}
          />
        ))}
      </ScrollView>
      {Views[buttonIndex]}
    </View>
  );
};

export default HistoryLayout;
