import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomIndicator from 'components/BottomIndicator';
import VideoDigest from '.';
import CategorizedView from '.';
import MyNotesView from './myNotes';
import { TabPageLayout } from '../_layout';

const viewWithinTab = [<CategorizedView />, <MyNotesView />];
const buttonConfig = [{ label: '标签分类' }, { label: '我的笔记' }];

const DigestTabLayout = () => {
  const [activeViewIndex, setActiveViewIndex] = useState(0);

  return (
    <View className="gap-4">
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
      <View>{viewWithinTab[activeViewIndex]}</View>
    </View>
  );
};

export default DigestTabLayout;
