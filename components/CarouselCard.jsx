import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const CarouselCard = ({ title, time, venue, poster, views }) => {
  return (
    <ImageBackground
      source={poster}
      resizeMode="cover"
      className="flex-1"
      style={{ borderRadius: '34.42px' }}>
      <LinearGradient
        colors={['#ffffff00', '#29292940', '#29292987']}
        locations={[0, 0.31, 1]} // Define color stop positions
        style={{
          height: 256,
          padding: 16,
        }}>
        <View className="flex-1 flex-col justify-between p-1">
          <View className="flex-row justify-between">
            <View className=" flex-row items-center justify-center gap-1 rounded-3xl bg-white px-2 py-1">
              <Ionicons name="ellipse" size={10} color={'#ff3f3f'} />
              <Text className="text-secondary text-base">Live</Text>
            </View>
            <View className="flex-row items-center justify-center gap-1.5">
              <Text className="text-primary text-2xl">{views}</Text>
              <Ionicons name="eye-outline" size={20} color={'#f2f2f2'} />
            </View>
          </View>
          <View className="gap-2">
            <Text
              className="text-primary text-3xl font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail">
              {title}
            </Text>
            <View className="flex-row items-center gap-8">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="time-outline" size={18} color={'#f2f2f2'} />
                <Text className="text-primary text-xl">{time}</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="location-outline" size={18} color={'#f2f2f2'} />
                <Text className="text-primary text-xl">{venue}</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default CarouselCard;
