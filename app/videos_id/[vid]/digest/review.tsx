import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import TintedBackground from 'components/TintedBackground';
import Collapsible from 'react-native-collapsible';

const essentials_review1 = {
  title: '安恒系列模型在过去一年有何重大进展与发展？当前版本相较于前作有哪些显著提升？',
  content:
    '详细探讨了云计算与人工智能(AI)技术融合的发展历程，并强调了这种融合如何驱动技术创新和社会进步。他指出，云计算已从单一的基础设施服务(如IaaS)演变。2.5版本全方位提升了其能力，特别是在文本理解和生成、逻辑推理以及指令追踪等方面均有大幅增强。该版本还展示了其文档处理的强大功能，能够处理1000万字以上的文档，并能同时快速理解和解析多个文档，支持多种文件格式和数据格式解构，能在各类场景中实现高效的信息提取和内容分析，提高了AI处理文档的能力。',
};

const EssentialsReview = () => {
  const [isReviewCollapsed, setIsReviewCollapsed] = useState(false);

  return (
    <View className="gap-4">
      <TintedBackground label="实时转写">
        <Collapsible
          collapsedHeight={125}
          style={{
            flexGrow: 1,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 10,
          }}
          collapsed={isReviewCollapsed}>
          <Text className="text-lg">{essentials_review1.title}</Text>
          <Text style={{ lineHeight: 24 }} className="text-gray-text">
            {essentials_review1.content}
          </Text>
        </Collapsible>
        <TouchableOpacity
          className="items-center"
          onPress={() => setIsReviewCollapsed(!isReviewCollapsed)}>
          <Text className="" style={{ color: '#c7c7c7' }}>
            {isReviewCollapsed ? '—— 查看全部 ——' : '—— 收起 ——'}
          </Text>
        </TouchableOpacity>
      </TintedBackground>
    </View>
  );
};

export default EssentialsReview;
