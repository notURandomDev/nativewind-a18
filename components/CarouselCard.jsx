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
      style={{ borderRadius: 17 }}>
      <LinearGradient
        colors={['#ffffff00', '#29292940', '#29292987']}
        locations={[0, 0.31, 1]} // Define color stop positions
        style={{
          height: 256,
          padding: 16,
        }}>
        <View className="flex-1 flex-col justify-between p-1">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center justify-center gap-1 rounded-3xl bg-white px-2 py-1">
              <Ionicons name="ellipse" size={8} color={'#ff3f3f'} />
              <Text className="text-sm font-[500] text-gray-ghost">Live</Text>
            </View>
            <View className="flex-row items-center justify-center gap-1.5">
              <Ionicons name="eye-outline" size={20} color={'#f2f2f2'} />
              <Text className="text-primary">{views + '人次'}</Text>
            </View>
          </View>
          <View className="gap-3">
            <Text className="text-2xl  text-primary" numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            <View className="gap-1">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="time-outline" size={14} color={'#f2f2f2'} />
                <Text className="text-primary">{time}</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="location-outline" size={14} color={'#f2f2f2'} />
                <Text className="text-primary">{venue}</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default CarouselCard;
