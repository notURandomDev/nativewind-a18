import { View, Text, FlatList } from 'react-native';
import React from 'react';
import Avatar from 'components/Avatar';
import CollapsibleShell from 'components/CollapsibleShell';
import { TabPageLayout } from '../../_layout';
import { ESSENTIALS_REVIEW1, SPEECHES_REVIEW } from './constants';
import TransItem from './components/TransItem';
import QAItem from './components/QAItem';
import SpeechItem from './components/SpeechItem';

const EssentialsReview = () => {
  return (
    <TabPageLayout>
      <View className="gap-4">
        <CollapsibleShell contentContainerStyle={{ gap: 16 }} withPadding={false} label="要点回顾">
          {ESSENTIALS_REVIEW1.map((item, index) => (
            <TransItem key={`trans-${index}`} {...item} />
          ))}
        </CollapsibleShell>
        <CollapsibleShell contentContainerStyle={{ gap: 16 }} withPadding={false} label="问答总结">
          {ESSENTIALS_REVIEW1.map(({ title: q, content: a }, index) => (
            <QAItem key={`ess-${index}`} q={q} a={a} />
          ))}
        </CollapsibleShell>
        <CollapsibleShell contentContainerStyle={{ gap: 16 }} withPadding={false} label="发言总结">
          {SPEECHES_REVIEW.map((item, index) => (
            <SpeechItem key={`speech-${index}`} {...item} />
          ))}
        </CollapsibleShell>
      </View>
    </TabPageLayout>
  );
};

export default EssentialsReview;
