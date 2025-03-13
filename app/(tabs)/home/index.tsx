import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Modal,
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
import MyCarousel from 'components/MyCarousel';
import VideoThumbnail from 'components/VideoThumbnail';
import { rrData } from 'data/carousels';
import BottomIndicator from 'components/BottomIndicator';
import { Link } from 'expo-router';

const width = Dimensions.get('screen').width;

const defaultDataWith6Colors = ['#B0604D', '#899F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1'];

interface InfoSlotProps {
  title?: string;
  time?: string;
  venue?: string;
}

export const InfoSlot = ({ title, time, venue }: InfoSlotProps) => {
  return (
    <View className="flex-1 gap-2">
      <Text className="text-lg font-medium">{title}</Text>
      <View className="flex-row items-center justify-between">
        <View className="gap-1">
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={12} color="#8B8B8B" />
            <Text style={{ fontSize: 12 }} className="text-gray-solid">
              {time}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={12} color="#8B8B8B" />
            <Text style={{ fontSize: 12 }} className="text-gray-solid">
              {venue}
            </Text>
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" size={16} color="#8B8B8B" />
      </View>
    </View>
  );
};

function App() {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <ScrollView
      contentContainerClassName="gap-8"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="relative py-3">
      {/* 直播推荐 */}
      <View className="gap-4">
        <CustomLink title="直播推荐" />
        <MyCarousel data={rrData} />
      </View>
      {/* 回放推荐 */}
      <View className="gap-4">
        <CustomLink title="回放推荐" />
        <FlatList
          scrollEnabled={false}
          contentContainerClassName="gap-5"
          data={replayRecommendations}
          renderItem={({ item: { title, time, venue, imgSrc, views, duration } }) => (
            <VideoCard
              leftSlot={<VideoThumbnail imgSrc={imgSrc} views={views} duration={duration} />}
              rightSlot={<InfoSlot title={title} time={time} venue={venue} />}
            />
          )}
        />
      </View>
      <Link href="../../chat" asChild>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="absolute items-center justify-center"
          style={{
            backgroundColor: '#ffffff',
            top: 360,
            right: 5,
            height: 65,
            width: 65,
            borderRadius: 13,
            borderColor: '#1556f010',
            borderWidth: 2,
          }}>
          <Image
            style={{ height: 40, width: 40 }}
            resizeMode="contain"
            source={require('../../../assets/imgs/favicon-1.png')}
          />
        </TouchableOpacity>
      </Link>
      <BottomIndicator />
    </ScrollView>
  );
}

export default App;
