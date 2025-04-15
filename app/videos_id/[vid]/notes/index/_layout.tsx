import { View } from 'react-native';
import React from 'react';

import CollapsibleShell from 'components/CollapsibleShell';
import { TabPageLayout } from '../../_layout';
import { NoteNode } from 'components/NoteItem';
import { KEY_NOTENODES, MARKED_NOTENODES, PENDING_NOTENODES } from './constants';

const CategorizedView = () => {
  return (
    <TabPageLayout>
      <View className="gap-4">
        <CollapsibleShell
          withPadding={false}
          label="重点内容"
          labelClassName="text-black"
          dotColor="#F66348"
          toggle="top">
          <View
            className="flex-1 gap-2"
            style={{ paddingTop: 16, borderTopWidth: 1, borderColor: '#1556F010' }}>
            {KEY_NOTENODES.map((node, index) => (
              <NoteNode {...node} key={`key-note-${index}`} color="#F66348" />
            ))}
          </View>
        </CollapsibleShell>
        <CollapsibleShell
          withPadding={false}
          label="疑惑内容"
          labelClassName="text-black"
          dotColor="#00BBFF"
          toggle="top">
          <View
            className="flex-1 gap-2"
            style={{ paddingTop: 16, borderTopWidth: 1, borderColor: '#1556F010' }}>
            {MARKED_NOTENODES.map((node, index) => (
              <NoteNode {...node} key={`marked-note-${index}`} color="#00BBFF" />
            ))}
          </View>
        </CollapsibleShell>
        <CollapsibleShell
          withPadding={false}
          label="待办内容"
          labelClassName="text-black"
          dotColor="#FFD84E"
          toggle="top">
          <View
            className="flex-1 gap-2"
            style={{ paddingTop: 16, borderTopWidth: 1, borderColor: '#1556F010' }}>
            {PENDING_NOTENODES.map((node, index) => (
              <NoteNode {...node} key={`pending-note-${index}`} color="#FFD84E" />
            ))}
          </View>
        </CollapsibleShell>
      </View>
    </TabPageLayout>
  );
};

export default CategorizedView;
