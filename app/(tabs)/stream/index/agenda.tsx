import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';
import Avatar from 'components/Avatar';
import Accordion from 'components/Accordion';
import Heading from 'components/Heading';
import PersonInfo from 'components/PersonInfo';
import DashedLine from 'react-native-dashed-line';
import agendas from 'data/agendas.js';

const AgendaView = () => {
  return (
    <View className="gap-5">
      {agendas.map(({ title, host, subagendas }, index) => (
        <View
          key={`agenda-${index}`}
          className="flex rounded-xl border border-gray bg-blue-faint p-5">
          <View className="gap gap-3 border-b border-gray pb-4">
            <Heading>{title}</Heading>
            <PersonInfo label={`主持人：${host.name}`} />
          </View>
          {subagendas.map((subagenda, subIndex) => (
            <View key={`subagenda-${index}-${subIndex}`} className="flex-row gap-3 py-4">
              <View className="pt-1">
                <Ionicons name="ellipse" color="#00BBFF" />
                <View className="border-gray-tertiary w-2 flex-1 border-r" />
              </View>
              <View className="flex-1 gap-3">
                <Text className="text-lg font-light">{subagenda.time}</Text>
                <Accordion
                  headingComponent={<Heading>{subagenda.title}</Heading>}
                  dataTag={subagenda.list.type}
                  itemsData={subagenda.list.data}
                />
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default AgendaView;
