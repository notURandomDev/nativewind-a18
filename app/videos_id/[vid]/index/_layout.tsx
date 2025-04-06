import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';
import AgendaView from './agenda';
import DownloadView from './download';
import DetailsView from '.';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomIndicator from 'components/BottomIndicator';
import { TabPageLayout } from '../_layout';

const viewWithinTab = [<DetailsView />, <AgendaView />, <DownloadView />];
const buttonConfig = [{ label: '会议详情' }, { label: '会议议程' }, { label: '资料下载' }];

const DetailsTabLayout = () => {
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
      <TabPageLayout>{viewWithinTab[activeViewIndex]}</TabPageLayout>
    </View>
  );
};

export default DetailsTabLayout;
