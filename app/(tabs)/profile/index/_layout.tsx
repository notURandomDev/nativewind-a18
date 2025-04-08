import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { replayRecommendations } from 'data/cards';
import { InfoSlot, VideoCard } from 'components/VideoCard';
import VideoThumbnail from 'components/VideoThumbnail';
import MeetingReplays from './meetingReplays';
import StreamingMeetings from './streamingMeetings';
import ReservedMeetings from './reservedMeetings';
import Activities from './activities';

const SwitchConfigs = [
  { label: '回放会议' },
  { label: '直播会议' },
  { label: '预定会议' },
  { label: '各类活动' },
];

const Views = [<MeetingReplays />, <StreamingMeetings />, <ReservedMeetings />, <Activities />];

const Subscription = () => {
  const [buttonIndex, setButtonIndex] = useState(0);

  return (
    <View className="flex-1">
      <View className="flex-row gap-2" style={{ paddingHorizontal: 24 }}>
        {SwitchConfigs.map(({ label }, index) => (
          <ButtonAllinOne
            onPress={() => setButtonIndex(index)}
            variant={index === buttonIndex ? 'solid' : 'outline'}
            key={`subscrption-button-${index}`}
            label={label}
          />
        ))}
      </View>
      {Views[buttonIndex]}
    </View>
  );
};

export default Subscription;
