import { View, Text } from 'react-native';
import React from 'react';
import CarouselCard from 'components/CarouselCard';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { rrData } from 'data/carousels';

interface myCarouselProps {
  data: Array<any>;
}

const MyCarousel = ({ data }: myCarouselProps) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View className="relative">
      <Carousel
        style={{ borderRadius: 17 }}
        ref={ref}
        width={360}
        height={215}
        data={data}
        autoPlay={true}
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
  );
};

export default MyCarousel;
