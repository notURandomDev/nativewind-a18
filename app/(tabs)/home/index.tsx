import CarouselCard from 'components/CarouselCard';
import * as React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import CustomLink from 'components/CustomLink';
import VideoCard from 'components/VideoCard';
import { replayRecommendations } from 'data/cards';
import Ionicons from '@expo/vector-icons/Ionicons';

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

interface RRVideoSlotProps {
  views?: number;
  duration?: string;
  imgSrc?: ImageSourcePropType;
}

const RRVideoSlot = ({ views, duration, imgSrc }: RRVideoSlotProps) => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 8.7 }}
      className="rounded-xl"
      style={{ height: 82, width: 140, borderRadius: 20, justifyContent: 'space-between' }}
      source={imgSrc}>
      <View className="flex-row items-center gap-1" style={{ padding: 8 }}>
        <Ionicons name="eye-outline" color="#ffffff" />
        <Text className="text-sm text-white">{views}人次</Text>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-end', padding: 6 }}>
        <Text className="text-white">{duration}</Text>
      </View>
    </ImageBackground>
  );
};

interface RRInfoSlotProps {
  title?: string;
  time?: string;
  venue?: string;
}

const RRInfoSlot = ({ title, time, venue }: RRInfoSlotProps) => {
  return (
    <View className="flex-1 gap-2">
      <Text className="text-lg font-medium">{title}</Text>
      <View className="gap-1">
        <View className="flex-row items-center gap-1">
          <Ionicons name="time-outline" size={14} color="#8B8B8B" />
          <Text className="text-gray-solid">{time}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons name="location-outline" size={14} color="#8B8B8B" />
          <Text className="text-gray-solid">{venue}</Text>
        </View>
      </View>
    </View>
  );
};

function App() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const ReplayRecommendationCombo = () => {
    return replayRecommendations.map(({ title, time, venue, imgSrc, views, duration }, index) => (
      <VideoCard
        key={`rr-${index}`}
        leftSlot={<RRVideoSlot imgSrc={imgSrc} views={views} duration={duration} />}
        rightSlot={<RRInfoSlot title={title} time={time} venue={venue} />}
      />
    ));
  };

  return (
    <ScrollView
      contentContainerClassName="gap-5"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="py-3">
      {/* 直播推荐 */}
      <View className="gap-4">
        <CustomLink title="直播推荐" />
        <View className="relative">
          <Carousel
            style={{ borderRadius: 17 }}
            ref={ref}
            width={360}
            height={256}
            data={data}
            autoPlay={false}
            autoPlayInterval={2000}
            onProgressChange={progress}
            renderItem={({ item }) => <CarouselCard {...item} />}
          />
          <Pagination.Basic
            progress={progress}
            data={data}
            dotStyle={{
              width: 7,
              height: 7,
              borderRadius: 100,
              backgroundColor: '#a6a6a6',
              overflow: 'hidden',
            }}
            activeDotStyle={{
              overflow: 'hidden',
              backgroundColor: '#e8e8e8',
              width: 7,
              height: 7,
              borderRadius: 100,
            }}
            containerStyle={{
              gap: 6,
              position: 'absolute',
              bottom: 20,
              right: 20,
            }}
            horizontal
            onPress={onPressPagination}
          />
        </View>
      </View>
      {/* 回放推荐 */}
      <View className="gap-4">
        <CustomLink title="回放推荐" />
        <ReplayRecommendationCombo />
      </View>
    </ScrollView>
  );
}

export default App;
