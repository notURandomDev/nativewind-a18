import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';

const DATA = [
  {
    title: '企业数字化与数据出海流通专项会议',
    time: '2025年5月19日14:30-17:20',
    venue: '杭州国际博览中心·103B/C',
    imgSrc: require('../../../../assets/imgs/rr-3.png'),
  },
  {
    title: '数据要素安全与新质生产力高端对话',
    time: '2025年5月19日14:30-17:20',
    venue: '杭州国际博览中心·多功能厅C',
    imgSrc: require('../../../../assets/imgs/reserved-1.png'),
  },
];

const ReservedMeetings = () => {
  return (
    <FlatList
      style={{ paddingHorizontal: 24 }}
      className="py-4"
      contentContainerClassName="gap-5"
      data={DATA}
      renderItem={({ item: { title, time, venue, imgSrc } }) => (
        <VideoCard
          leftSlot={<VideoThumbnail comingUp imgSrc={imgSrc} />}
          rightSlot={<InfoSlot title={title} time={time} venue={venue} />}
        />
      )}
    />
  );
};

export default ReservedMeetings;
