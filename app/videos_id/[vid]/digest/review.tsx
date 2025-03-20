import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import TintedBackground from 'components/TintedBackground';
import Collapsible from 'react-native-collapsible';
import Avatar from 'components/Avatar';
import CollapsibleShell from 'components/CollapsibleShell';

const essentials_review = [
  {
    title: '安恒系列模型在过去一年有何重大进展与发展？当前版本相较于前作有哪些显著提升？',
    content:
      '详细探讨了云计算与人工智能(AI)技术融合的发展历程，并强调了这种融合如何驱动技术创新和社会进步。他指出，云计算已从单一的基础设施服务(如IaaS)演变。2.5版本全方位提升了其能力，特别是在文本理解和生成、逻辑推理以及指令追踪等方面均有大幅增强。该版本还展示了其文档处理的强大功能，能够处理1000万字以上的文档，并能同时快速理解和解析多个文档，支持多种文件格式和数据格式解构，能在各类场景中实现高效的信息提取和内容分析，提高了AI处理文档的能力。',
  },
  {
    title: '如何将强大的AI模型能力应用于实际业务场景？',
    content:
      '为了让模型能力更好地服务于企业和推动整体AI产业发展，安恒推出了目前的2.0平台。该平台旨在连接大模型与复杂业务场景，为企业提供低延迟、弹性扩展且高性价比的模型服务，满足多样化选择和快速融入企业业务需求的要求。',
  },
  {
    title:
      '云计算如何从2006年的初步概念扩展到现在？大语言模型的兴起与发展如何进一步促进云计算的发展？',
    content:
      '云计算自2006年提出以来，经过约20年的发展已从最初的狭义概念转变为涵盖了芯片、指令集等硬件层面，并延伸至AI领域的大模型、MaaS等高级形态。这一过程中经历了多个关键发展阶段，如初期主要服务于BBS站长和手机游戏公司，随后随着云原生技术和容器化微服务架构的崛起，云计算逐步构建起强大而稳定的支撑平台，吸引更多企业和组织采用。生成式AI（如大语言模型）的爆发式增长，不仅带动了其本身的训练和推理过程中的市场需求，还会催生众多具有商业价值的应用，这些应用反过来将进一步推动云计算市场的需求增长。云因其能高效支持AI原生应用的研发和运行，被认为是在当前AI时代发挥重要作用的关键因素之一，对于技术创新和社会数字化智能化具有深远意义。',
  },
];

const speeches_review = [
  {
    title: '发言人1',
    content:
      '详细探讨了云计算与人工智能(AI)技术融合的发展历程，并强调了这种融合如何驱动技术创新和社会进步。他指出，云计算已从单一的基础设施服务(如IaaS)演变。2.5版本全方位提升了其能力，特别是在文本理解和生成、逻辑推理以及指令追踪等方面均有大幅增强。该版本还展示了其文档处理的强大功能，能够处理1000万字以上的文档，并能同时快速理解和解析多个文档，支持多种文件格式和数据格式解构，能在各类场景中实现高效的信息提取和内容分析，提高了AI处理文档的能力。',
  },
  {
    title: '发言人2',
    content:
      '为了让模型能力更好地服务于企业和推动整体AI产业发展，安恒推出了目前的2.0平台。该平台旨在连接大模型与复杂业务场景，为企业提供低延迟、弹性扩展且高性价比的模型服务，满足多样化选择和快速融入企业业务需求的要求。',
  },
  {
    title: '发言人3',
    content:
      '云计算自2006年提出以来，经过约20年的发展已从最初的狭义概念转变为涵盖了芯片、指令集等硬件层面，并延伸至AI领域的大模型、MaaS等高级形态。这一过程中经历了多个关键发展阶段，如初期主要服务于BBS站长和手机游戏公司，随后随着云原生技术和容器化微服务架构的崛起，云计算逐步构建起强大而稳定的支撑平台，吸引更多企业和组织采用。生成式AI（如大语言模型）的爆发式增长，不仅带动了其本身的训练和推理过程中的市场需求，还会催生众多具有商业价值的应用，这些应用反过来将进一步推动云计算市场的需求增长。云因其能高效支持AI原生应用的研发和运行，被认为是在当前AI时代发挥重要作用的关键因素之一，对于技术创新和社会数字化智能化具有深远意义。',
  },
];

const EssentialsReview = () => {
  return (
    <View className="gap-4">
      <CollapsibleShell withPadding={false} label="实时转写">
        <FlatList
          style={{ borderRadius: 10 }}
          contentContainerClassName="gap-4"
          scrollEnabled={false}
          data={essentials_review}
          renderItem={({ item: { title, content } }) => (
            <View
              className="flex-1 gap-3 bg-white px-4"
              style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 }}>
              <Text className="text-lg font-medium">{title}</Text>
              <Text style={{ lineHeight: 26 }} className="font-light text-gray-text">
                {content}
              </Text>
            </View>
          )}
        />
      </CollapsibleShell>
      <CollapsibleShell withPadding={false} label="问答总结">
        <FlatList
          style={{ borderRadius: 10 }}
          contentContainerClassName="gap-4"
          scrollEnabled={false}
          data={essentials_review}
          renderItem={({ item: { title, content } }) => (
            <View
              className="flex-1 gap-3 bg-white px-4"
              style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 }}>
              <View className="flex-row items-center gap-2" style={{ paddingEnd: 24 }}>
                <View className="bg-blue" style={{ borderRadius: 6, padding: 5 }}>
                  <Text className=" text-white" style={{ fontSize: 14 }}>
                    问
                  </Text>
                </View>
                <View className="flex-1 flex-row gap-2">
                  <Avatar />
                  <Text numberOfLines={1} className="text-lg font-medium">
                    {title}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-start gap-2" style={{ paddingEnd: 24 }}>
                <View className="bg-blue" style={{ borderRadius: 6, padding: 5 }}>
                  <Text className=" text-white" style={{ fontSize: 14 }}>
                    答
                  </Text>
                </View>
                <View className="flex-1 flex-row gap-2">
                  <Avatar />
                  <Text className="text-lg font-light text-gray-text">{content}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </CollapsibleShell>
      <CollapsibleShell withPadding={false} label="发言总结">
        <FlatList
          style={{ borderRadius: 10 }}
          contentContainerClassName="gap-4"
          scrollEnabled={false}
          data={speeches_review}
          renderItem={({ item: { title, content } }) => (
            <View
              className="flex-1 gap-3 bg-white px-4"
              style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 }}>
              <View className="flex-row gap-2">
                <Avatar />
                <Text className="text-lg font-medium">{title}</Text>
              </View>
              <Text style={{ lineHeight: 26 }} className="font-light text-gray-text">
                {content}
              </Text>
            </View>
          )}
        />
      </CollapsibleShell>
    </View>
  );
};

export default EssentialsReview;
