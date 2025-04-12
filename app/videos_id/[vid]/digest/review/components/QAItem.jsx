import { View, Text } from 'react-native';
import React from 'react';

const QAItem = ({ q, a }) => (
  <View style={{ borderRadius: 10 }} className="gap-3 border bg-white px-4 py-3">
    <View className="flex-row gap-2 ">
      <QIcon />
      <Text
        numberOfLines={1}
        style={{ fontSize: 20, lineHeight: 28 }}
        className="flex-1 font-medium">
        {q}
      </Text>
    </View>
    <View className="flex-row items-start gap-2 ">
      <AIcon />
      <View className="flex-1 flex-row gap-2">
        <Text style={{ fontSize: 16, lineHeight: 26 }} className="font-light">
          {a}
        </Text>
      </View>
    </View>
  </View>
);

const QIcon = () => (
  <View className="bg-blue" style={{ borderRadius: 6, padding: 5 }}>
    <Text className=" font-medium text-white" style={{ fontSize: 14 }}>
      问
    </Text>
  </View>
);

const AIcon = () => (
  <View className="bg-blue" style={{ borderRadius: 6, padding: 5 }}>
    <Text className=" font-medium text-white" style={{ fontSize: 14 }}>
      答
    </Text>
  </View>
);

export default QAItem;
