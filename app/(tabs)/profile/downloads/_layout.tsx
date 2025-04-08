import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import ButtonAllinOne from 'components/ButtonAllinOne';

import Slides from './slides';
import Policies from './policies';
import Posters from './posters';
import Guests from './guests';

const Views = [<Slides />, <Policies />, <Posters />, <Guests />];

const SwitchConfigs = [
  { label: 'PPT集锦' },
  { label: '政策文献与实务指南' },
  { label: '议程海报' },
  { label: '嘉宾海报' },
];

const DownloadsLayout = () => {
  const [buttonIndex, setButtonIndex] = useState(0);

  return (
    <View className="flex-1 gap-4">
      <View className="flex-row gap-2" style={{ paddingHorizontal: 20 }}>
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

export default DownloadsLayout;
