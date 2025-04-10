import { View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode, useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import PersonInfo from './PersonInfo';
import { timestampConverter } from 'utils/timestampConverter';

interface itemDataProps {
  label: string;
  sublabel?: string;
  startTime?: number;
  endTime?: number;
}

interface AccordionProps {
  itemsData?: itemDataProps[];
  headingComponent?: ReactNode;
  dataTag?: string;
  itemType?: 'person' | 'digest';
}

const HeadingPlaceholder = () => {
  return (
    <View
      accessibilityLabel="heading-accordion-placeholder"
      className="flex-row items-center gap-2">
      <Ionicons name="text-outline" size={20} />
      <Text className="text-xl font-medium">默认标题</Text>
    </View>
  );
};

const itemsDataPlaceholder = [
  { label: '标题1', sublabel: '副标题1' },
  { label: '标题2', sublabel: '副标题2' },
  { label: '标题3', sublabel: '副标题3' },
  { label: '标题4', sublabel: '副标题4' },
  { label: '标题5', sublabel: '副标题5' },
];

const Accordion = ({
  headingComponent = <HeadingPlaceholder />,
  itemsData = itemsDataPlaceholder,
  dataTag = '',
  itemType = 'person',
}: AccordionProps) => {
  const itemCount = itemsData.length;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => setIsExpanded(!isExpanded);

  const RenderItems = () => {
    let renderedItems = itemsData;

    if (itemsData.length > 3 && !isExpanded) {
      renderedItems = itemsData.slice(0, 3);
    }

    if (itemType === 'digest') {
      return renderedItems.map(({ label, sublabel, startTime }, index) => (
        <DigestSection title={label} startTimestamp={startTime} content={sublabel} />
      ));
    } else {
      return renderedItems.map(({ label, sublabel }, index) => (
        <PersonInfo key={`item-${label}-${sublabel}-${index}`} label={label} sublabel={sublabel} />
      ));
    }
  };

  return (
    <View className="gap-3">
      <View
        accessibilityLabel="block-accordion-heading"
        className="flex-row items-center justify-between">
        <View className={`${itemsData.length > 3 ? 'w-2/3' : 'w-full'} pr-1`}>
          {headingComponent}
        </View>
        {itemsData.length > 3 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggle}
            accessibilityLabel="expand-toggle-button"
            className="flex-row items-center gap-1">
            <Text className="text-gray-solid">
              {isExpanded ? '收起' + dataTag : `展开${dataTag}(${itemCount})`}
            </Text>
            <Ionicons size={14} name={isExpanded ? 'chevron-up' : 'chevron-down'} color="#8B8B8B" />
          </TouchableOpacity>
        )}
      </View>
      <View className="gap-3">
        <RenderItems />
      </View>
    </View>
  );
};

interface DigestSectionProps {
  title: string;
  content?: string;
  startTimestamp?: number;
}
const DigestSection = ({ title, content, startTimestamp = 0 }: DigestSectionProps) => {
  const { hour, minute, second } = getHMS(startTimestamp / 1000);
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  return (
    <View className="gap-2">
      <View className="flex-row gap-2">
        <Text className="text-lg font-light text-gray-text">{timeStr}</Text>
        <Text className="text-lg font-medium">{title}</Text>
      </View>
      <View style={{ borderRadius: 8.7 }} className="bg-white px-3 py-4">
        <Text className="font-light text-gray-text" style={{ lineHeight: 18 }}>
          {content}
        </Text>
      </View>
    </View>
  );
};

const getHMS = (seconds: number) => {
  const hour = Math.round(seconds / 60 / 60);
  const minute = Math.round(seconds / 60);
  const second = Math.round(seconds % 60);
  return { hour, minute, second };
};

export default Accordion;
