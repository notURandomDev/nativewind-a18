import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';

import Collapsible from 'react-native-collapsible';
import TintedBackground from 'components/TintedBackground';
import CollapsibleShell from 'components/CollapsibleShell';
import BottomIndicator from 'components/BottomIndicator';
import TabLayout from 'app/(tabs)/_layout';
import { TabPageLayout } from '../_layout';

const DIGEST_PLACEHOLDER =
  '网络安全、数据安全是城市发展不可或缺的重要保障。作为始创于杭州的网络安全领域盛会，2024西湖论剑·数字安全大会以“智绘安全，乘数而上”为主题，聚焦探讨“数字安全助力数据要素×产业落地”“AI引领数字安全变革”“安全运营智能化、实战化”等内容，邀请国内数字安全领域顶尖专家、学者、企业家及科研人员，围绕“安全行业发展现状，人工智能、数据要素带来的技术革新和安全挑战，数字时代新技术新场景的网络安全发展趋势，软件应用链安全的关键产品研发”等话题展开交流讨论，助力推动杭州数字安全产业在人工智能时代实现跨越发展据悉，本届大会将设1个主题大会、13场专题会议及研讨会、1场数据安全创新实践案例发布会。同时，西湖论剑安全特训营将正式开班，设置AI大模型认知与应用能力提升班、数据要素×高级研修班两大主题课程。2025西湖论剑·数字安全创新成果展也于5月17日-18日开启。';

const VideoDigest = () => {
  return (
    <TabPageLayout>
      <View className="gap-4">
        <CollapsibleShell label="全文概要" contentContainerStyle={{ backgroundColor: '#ffffff' }}>
          <Text style={{ lineHeight: 24 }} className="text-gray-text">
            {DIGEST_PLACEHOLDER}
          </Text>
        </CollapsibleShell>
        <CollapsibleShell label="会议脑图" collaspeEnabled={false} withPadding={false}>
          <Image
            style={{ flex: 1, width: null, height: 280 }}
            resizeMode="contain"
            source={require('../../../../assets/imgs/mindmap_placeholder.png')}
          />
        </CollapsibleShell>
      </View>
    </TabPageLayout>
  );
};

export default VideoDigest;
