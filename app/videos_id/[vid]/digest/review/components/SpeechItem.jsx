import { View, Text, Image } from 'react-native';
import React from 'react';
import Pravatar from 'components/Pravatar';

const SpeechItem = ({ title, content }) => {
  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2">
        {/* <Image
          className="rounded-full border"
          style={{ height: 30, width: 30 }}
          source={require('../../../../../../assets/imgs/boss.jpg')}
        /> */}
        <Pravatar />
        <Text style={{ fontSize: 20, lineHeight: 28 }} className="font-medium">
          {title}
        </Text>
      </View>
      <View style={{ borderRadius: 10 }} className="border bg-white px-4 py-3">
        <Text style={{ fontSize: 16, lineHeight: 26 }} className="font-light">
          {content}
        </Text>
      </View>
    </View>
  );
};

export default SpeechItem;
