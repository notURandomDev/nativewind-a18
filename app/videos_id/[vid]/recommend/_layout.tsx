import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import LiveRecommend from './LiveRecommend';
import ReplayRecommend from './ReplayRecommend';

const buttonConfig = [{ label: '直播推荐' }, { label: '回放推荐' }];

const viewWithinTab = [<LiveRecommend />, <ReplayRecommend />];

const RecommendLayout = () => {
  const [activeViewIndex, setActiveViewIndex] = useState(0);

  return (
    <View style={{ paddingBottom: 220 }} className="flex-1 gap-4">
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

export default RecommendLayout;
