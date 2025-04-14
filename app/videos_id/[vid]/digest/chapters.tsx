import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Accordion from 'components/Accordion';
import Chapters from 'data/chapters';
import { formatTime } from 'utils/formatTime';
import BottomIndicator from 'components/BottomIndicator';
import FadeInMaskView from 'components/FadeInMaskView';

const ChaptersSnapshot = () => {
  const scrollviewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // setTimeout(() => scrollviewRef.current?.scrollToEnd(), 750);
  }, []);
  return (
    <ScrollView
      ref={scrollviewRef}
      contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        gap: 12,
        backgroundColor: '#ffffff',
        paddingHorizontal: 28,
        // paddingBottom: 285,
      }}>
      <View className="relative gap-5">
        {/* <FadeInMaskView /> */}
        {Chapters.slice(0, 1).map((chapter, index) => {
          console.log(`agenda-${index}`);
          return <ChapterItem {...chapter} key={`agenda-${index}`} />;
        })}
      </View>
      <BottomIndicator />
    </ScrollView>
  );
};

interface ChapterItemProps {
  title: string;
  subagendas: any[];
  host: any;
}
const ChapterItem = ({ title, subagendas, host }: ChapterItemProps) => {
  return (
    <View style={{ borderRadius: 17 }} className="flex bg-blue-faint p-5">
      <View className="gap gap-3 border-b border-gray pb-4">
        <View className="flex-row items-center gap-2">
          <Text style={{ fontSize: 19 }} className="text-wrap text-blue">
            <Ionicons size={15} name="ellipse" color="#1556f0" />
            {` ${title}`}
          </Text>
        </View>
      </View>
      {subagendas.map((subagenda, subIndex) => {
        console.log(`subagenda-${subagenda.time}-${subIndex}`);
        return (
          <SubAgendaItem
            time={subagenda.time}
            accordionData={subagenda.list.data}
            title={subagenda.title}
            type={subagenda.list.type}
            key={`subagenda-${subagenda.time}-${subIndex}`}
          />
        );
      })}
    </View>
  );
};

interface SubAgendaItemProps {
  time: string;
  title: string;
  type: string;
  accordionData: any[];
}
const SubAgendaItem = ({ time, title, type, accordionData }: SubAgendaItemProps) => {
  const [startTime, endTime] = time.split('-');
  const st = formatTime(Math.round(Number(startTime) / 1000));
  const et = formatTime(Math.round(Number(endTime) / 1000));
  const timeRange = `${st}-${et}`;
  return (
    <View className="flex-row gap-3 py-4">
      <View className="pt-1">
        <Ionicons name="ellipse" color="#1556f0" />
        <View className="w-2 flex-1 border-r border-gray-tertiary" />
      </View>
      <View className="flex-1 gap-3">
        <Text className="text-lg">{timeRange}</Text>
        <Accordion
          itemType="digest"
          headingComponent={
            <Text className="text-xl font-medium" style={{ fontSize: 18 }}>
              {title}
            </Text>
          }
          dataTag={type}
          itemsData={accordionData}
        />
      </View>
    </View>
  );
};

export default ChaptersSnapshot;
