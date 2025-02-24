import CarouselCard from 'components/CarouselCard';
import * as React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

const data = [
  {
    title: '西湖论剑暨安恒信息年度新品发布日',
    time: '09:00 - 11:45',
    venue: '安恒大厦2层',
    poster: require('../../../assets/imgs/ai.jpg'),
    views: '30432',
  },
  {
    title: '生态合作伙伴大会',
    time: '09:00 - 11:50',
    venue: '杭州白金汉爵大酒店',
    poster: require('../../../assets/imgs/eco.jpg'),
    views: '12790',
  },
  {
    title: '教育系统数据安全专题会议',
    time: '08:00 - 12:00',
    venue: '浙江省嘉兴市乌镇',
    poster: require('../../../assets/imgs/education.jpg'),
    views: '34245',
  },
  {
    title: '开幕式及主题大会',
    time: '09:00 - 12:00',
    venue: '杭州国际博览中心',
    poster: require('../../../assets/imgs/safety.jpg'),
    views: '104680',
  },
];
const width = Dimensions.get('screen').width;

const defaultDataWith6Colors = ['#B0604D', '#899F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1'];

function App() {
  const ref = React.useRef(null);
  const progress = useSharedValue(0);

  const onPressPagination = (index) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View className="flex-1 items-center bg-white px-3 py-3">
      <View className="relative">
        <Carousel
          style={{ borderRadius: 25 }}
          ref={ref}
          width={360}
          height={256}
          data={data}
          autoPlay={false}
          autoPlayInterval={2000}
          onProgressChange={progress}
          renderItem={({ item }) => <CarouselCard {...item} />}
        />
        <View className="absolute bottom-2 self-center">
          <Pagination.Basic
            progress={progress}
            data={data}
            dotStyle={{
              width: 25,
              height: 2,
              backgroundColor: '#a6a6a6',
            }}
            activeDotStyle={{
              overflow: 'hidden',
              backgroundColor: '#e8e8e8',
            }}
            containerStyle={{
              gap: 5,
            }}
            horizontal
            onPress={onPressPagination}
          />
        </View>
      </View>
    </View>
  );
}

export default App;
