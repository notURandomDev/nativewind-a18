import { View, Text } from 'react-native';
import React from 'react';
import MyTextInput from 'components/MyTextInput';

import Ionicons from '@expo/vector-icons/Ionicons';

const CategorizedView = () => {
  return (
    <View>
      <MyTextInput
        icon={<Ionicons size={18} name="search-outline" color="#8b8b8b" />}
        placeholder="搜索标记内容"
      />
    </View>
  );
};

export default CategorizedView;
