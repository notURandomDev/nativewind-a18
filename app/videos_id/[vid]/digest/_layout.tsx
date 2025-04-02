import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomIndicator from 'components/BottomIndicator';
import ChaptersSnapshot from './chapters';
import EssentialsReview from './review';
import RealtimeTranscribe from './transcribe';
import VideoDigest from '.';
import { TabPageLayout } from '../_layout';

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
    <View style={{ paddingBottom: 285 }} className="flex-1 gap-4">
      <View accessibilityLabel="block-buttons" className="flex-row gap-3 rounded-none px-8">
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
