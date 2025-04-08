import { FlatList } from 'react-native';
import React from 'react';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';
const DATA = [
  {
    title: '西湖论剑演讲专题会议·AI引领数字安全新浪潮',
    time: '2025年5月18日8:30-11:20',
    venue: '杭州国际博览中心·102B/C',
    imgSrc: require('../../../../assets/imgs/streaming-1.png'),
    views: 2323,
  },
  {
    title: '西湖论剑演讲专题会议·教育系统数据安全专题会议',
    time: '2025年5月18日8:30-11:20',
    venue: '浙江省嘉兴市乌镇镇虹桥路165号安...',
    imgSrc: require('../../../../assets/imgs/streaming-2.png'),
    views: 1989,
  },
];

const Streams = () => {
  return (
    <FlatList
      style={{ paddingHorizontal: 24 }}
      className="py-4"
      contentContainerClassName="gap-5"
      data={DATA}
      renderItem={({ item: { title, time, venue, imgSrc, views } }) => (
        <VideoCard
          leftSlot={<VideoThumbnail live imgSrc={imgSrc} views={views} />}
          rightSlot={<InfoSlot live title={title} time={time} venue={venue} />}
        />
      )}
    />
  );
};

export default Streams;
