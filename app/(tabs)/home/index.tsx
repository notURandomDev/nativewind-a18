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
import { VideoCard, InfoSlot } from 'components/VideoCard';
import { replayRecommendations } from 'data/cards';
import Ionicons from '@expo/vector-icons/Ionicons';
import MyCarousel from 'components/MyCarousel';
import VideoThumbnail from 'components/VideoThumbnail';
import { rrData } from 'data/carousels';
import BottomIndicator from 'components/BottomIndicator';
import { Link } from 'expo-router';

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
