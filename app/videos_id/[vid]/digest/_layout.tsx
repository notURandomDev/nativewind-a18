import { View } from 'react-native';
import React, { useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import ChaptersSnapshot from './chapters';
import EssentialsReview from './review/review';
import RealtimeTranscribe from './transcribe/transcribe';
import VideoDigest from '.';

const viewWithinTab = [
  <VideoDigest />,
  <ChaptersSnapshot />,
  <RealtimeTranscribe />,
  <EssentialsReview />,
];
const buttonConfig = [
  { label: '概要脑图' },
  { label: '章节速览' },
  { label: '实时转写' },
  { label: '要点回顾' },
];

const DigestTabLayout = () => {
  const [activeViewIndex, setActiveViewIndex] = useState(0);

  return (
    <View style={{ paddingBottom: 220 }} className="flex-1 gap-4">
      <View accessibilityLabel="block-buttons" className="flex-row gap-3 rounded-none px-6">
        {buttonConfig.map(({ label }, index) => {
          return (
            <ButtonAllinOne
              key={`button-all-in-one-${index}`}
              label={label}
              variant={index === activeViewIndex ? 'solid' : 'outline'}
              onPress={() => {
                setActiveViewIndex(index);
              }}
              textColor={index === activeViewIndex ? 'text-white' : ''}
            />
          );
        })}
      </View>
      {viewWithinTab[activeViewIndex]}
    </View>
  );
};

export default DigestTabLayout;
