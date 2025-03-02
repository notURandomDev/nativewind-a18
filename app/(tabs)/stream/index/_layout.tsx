import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import AgendaView from './agenda';
import DownloadView from './download';
import MindmapView from './mindmap';
import DetailsView from '.';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const viewWithinTab = [<DetailsView />, <AgendaView />, <MindmapView />, <DownloadView />];
const buttonConfig = [
  { label: '会议详情' },
  { label: '会议议程' },
  { label: '会议脑图' },
  { label: '资料下载' },
];

const DetailsTabLayout = () => {
  const [activeViewIndex, setActiveViewIndex] = useState(0);

  return (
    <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        gap: 12,
        backgroundColor: '#ffffff',
        paddingHorizontal: 28,
        paddingVertical: 16,
        paddingBottom: 250,
      }}>
      <View accessibilityLabel="block-buttons" className="flex-row gap-3 rounded-none">
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
      <View className="items-center justify-center">
        <Text className="text-gray-tertiary text-sm font-light">—— 已到底部 ——</Text>
      </View>
    </ScrollView>
  );
};

export default DetailsTabLayout;
