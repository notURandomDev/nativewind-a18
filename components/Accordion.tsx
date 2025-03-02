import { View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode, useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import Avatar from './Avatar';
import PersonInfo from './PersonInfo';

interface itemDataProps {
  label: string;
  sublabel?: string;
}

interface AccordionProps {
  items?: ReactNode[];
  itemsData?: itemDataProps[];
  headingComponent?: ReactNode;
  dataTag?: string;
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
}: AccordionProps) => {
  const itemCount = itemsData.length;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => setIsExpanded(!isExpanded);

  const RenderItems = () => {
    let renderedItems = itemsData;

    if (itemsData.length > 3 && !isExpanded) {
      renderedItems = itemsData.slice(0, 3);
    }

    return renderedItems.map(({ label, sublabel }, index) => (
      <PersonInfo key={`item-${label}-${sublabel}-${index}`} label={label} sublabel={sublabel} />
    ));
  };

  return (
    <View className="gap-3">
      <View
        accessibilityLabel="block-accordion-heading"
        className="flex-row items-center justify-between">
        <View className="w-2/3">{headingComponent}</View>
        {itemsData.length > 3 && (
          <TouchableOpacity
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

export default Accordion;
