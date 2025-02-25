import { View, Text, Button } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Profile = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');

  /* const doubledCount = useMemo(() => {
    console.log('计算 doubledCount');
    return count * 2;
  }, [count]); */

  // 每次渲染都会重新计算
  const doubledCount = count * 2;
  console.log('渲染中，计算 doubledCount:', doubledCount);

  // useEffect：在渲染后记录日志
  useEffect(() => {
    console.log('渲染完成，count 是:', count);
  }, [count]);

  return (
    <SafeAreaView>
      <View>
        <Text>计数: {count}</Text>
        <Text>双倍: {doubledCount}</Text>
        <Text>名字: {name}</Text>
        <Button onPress={() => setCount(count + 1)} title="加1" />
        <Button onPress={() => setName('a')} title="改名" />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Profile;
