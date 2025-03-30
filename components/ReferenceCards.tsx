import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ContextMenu from 'react-native-context-menu-view';

interface MeetingRefCardProps {
  imgSource: ImageSourcePropType;
  title: string;
  meetingId: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
}

const MeetingRefCard = (props: MeetingRefCardProps) => {
  const { imgSource, title, startTime, endTime, description, location } = props;
  const [date, start] = startTime.split('T');
  const [date_, end] = endTime.split('T');

  const [year, month, day] = date.split('-');

  return (
    <View style={{ borderRadius: 17 }} className="relative flex-row gap-3 px-4 py-4">
      <LinearGradient
        colors={['#158AF030', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 16,
          opacity: 0.4,
        }}
      />
      <Image style={{ width: '17%', aspectRatio: 1, borderRadius: 17 }} source={imgSource} />
      <View className="flex-1 justify-center gap-0">
        <Text className="text-sm font-medium text-gray-solid">{location}</Text>
        <View className="">
          <Text className="text-2xl font-medium">{title}</Text>
          <Text className="text-base font-medium text-gray-text">{description}</Text>
        </View>
      </View>
      <View
        className="ml-auto items-center justify-center gap-1 px-2 py-0"
        style={{ borderRadius: 17 }}>
        <Text className="text-lg font-semibold">{month === '04' ? 'Apr' : 'May'}</Text>
        <Text className="text-5xl font-semibold">{day}</Text>
        {/* <Text
      style={{ fontSize: 10 }}
      className="font-medium">{`${start.slice(0, 5)}-${end.slice(0, 5)}`}</Text> */}
      </View>
      {/* <Text className="text-xs font-medium text-gray-solid">{`${date}  ${start.slice(0, 5)} - ${end.slice(0, 5)}`}</Text> */}
    </View>
  );
};

export { MeetingRefCard };
