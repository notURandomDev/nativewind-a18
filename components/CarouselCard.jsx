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
        colors={['#000000', '#6D6D6D00']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.4 }}
        style={{
          height: 256,
          padding: 16,
        }}>
        <View className="flex-1 flex-col justify-between p-1">
          <View>
            {views && (
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center justify-center gap-1 rounded-3xl bg-white px-2 py-1">
                  <Ionicons name="ellipse" size={8} color={'#ff3f3f'} />
                  <Text className="text-base font-[500] text-gray-ghost">Live</Text>
                </View>
                <View className="flex-row items-center justify-center gap-1.5">
                  <Ionicons name="eye-outline" size={20} color={'#f2f2f2'} />
                  <Text className="text-primary">{views + '人次'}</Text>
                </View>
              </View>
            )}
          </View>
          <View className="gap-3">
            <Text className="text-2xl  text-primary" numberOfLines={2} ellipsizeMode="tail">
              {title}
            </Text>
            <View className="gap-1.5">
              {time && (
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="time-outline" size={14} color={'#f2f2f2'} />
                  <Text className="font-light text-primary">{time}</Text>
                </View>
              )}
              {venue && (
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="location-outline" size={14} color={'#f2f2f2'} />
                  <Text className="font-light text-primary">{venue}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default CarouselCard;
