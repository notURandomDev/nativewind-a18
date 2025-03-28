import { View, Text, ImageSourcePropType, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface ServiceCardProps {
  source: ImageSourcePropType;
  label: string;
}
const ServiceCard = ({ label, source }: ServiceCardProps) => (
  <View
    style={{ width: '48%', borderRadius: 17 }}
    className="relative flex-row items-center justify-center gap-2 py-4">
    <LinearGradient
      colors={['#F5F8FF', '#E9E8FF']}
      start={{ x: 0, y: 0.45 }}
      end={{ x: 0, y: 1 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 17,
      }}
    />
    <Image className="" resizeMode="contain" style={{ width: 25, height: 25 }} source={source} />
    <Text className="text-xl text-blue">{label}</Text>
  </View>
);

interface VenueServiceCardProps extends ServiceCardProps {
  columns?: 3 | 4;
}
const VenueServiceCard = ({ source, label, columns = 4 }: VenueServiceCardProps) => {
  return (
    <View
      className="bg-blue-faint "
      style={{ borderRadius: 8, width: columns === 4 ? '22%' : '31%' }}>
      <View
        className="items-center justify-center rounded-t-sm px-3 py-4"
        style={{ paddingBottom: 12 }}>
        <Image style={{ width: 50, height: 60 }} resizeMode="contain" source={source} />
      </View>
      <View
        style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
        className="items-center justify-center bg-blue px-3 py-2">
        <Text className="text-xl text-white">{label}</Text>
      </View>
    </View>
  );
};

export { ServiceCard, ServiceCardProps, VenueServiceCard };
