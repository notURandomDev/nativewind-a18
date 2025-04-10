import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Accordion from 'components/Accordion';
import Chapters from 'data/chapters';
import { TabPageLayout } from '../_layout';

const ChaptersSnapshot = () => {
  return (
    <TabPageLayout>
      <View className="gap-5">
        {Chapters.map(({ title, host, subagendas }, index) => (
          <View
            key={`agenda-${index}`}
            style={{ borderRadius: 17 }}
            className="flex bg-blue-faint p-5">
            <View className="gap gap-3 border-b border-gray pb-4">
              <View className="flex-row items-center gap-2">
                <Text style={{ fontSize: 19 }} className="text-wrap text-blue">
                  <Ionicons size={15} name="ellipse" color="#1556f0" />
                  {` ${title}`}
                </Text>
              </View>
            </View>
            {subagendas.map((subagenda, subIndex) => (
              <View key={`subagenda-${index}-${subIndex}`} className="flex-row gap-3 py-4">
                <View className="pt-1">
                  <Ionicons name="ellipse" color="#1556f0" />
                  <View className="w-2 flex-1 border-r border-gray-tertiary" />
                </View>
                <View className="flex-1 gap-3">
                  <Text className="text-lg">{subagenda.time}</Text>
                  <Accordion
                    itemType="digest"
                    headingComponent={
                      <Text className="text-xl font-medium" style={{ fontSize: 18 }}>
                        {subagenda.title}
                      </Text>
                    }
                    dataTag={subagenda.list.type}
                    itemsData={subagenda.list.data}
                  />
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </TabPageLayout>
  );
};

export default ChaptersSnapshot;
