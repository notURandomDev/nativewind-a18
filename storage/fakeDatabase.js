import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 在modal组件unmount的时候调用该函数，将state中存储的信息数据进行存储
 *
 * @param chatId 测试的时候，chatId为1
 * @param messages 以数组的形式传入，存储时会转成字符串
 */
const saveChat = async (chatId, messages) => {
  console.log('received messages:', messages);
  try {
    await AsyncStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
    console.log(`[${Date.now().toString()}] Messages Saved!`);
  } catch (e) {
    console.error(e);
  }
};

/**
 * 在modal组件mount的时候调用该函数，将存储的信息作为state的初始化数据
 *
 * @param chatId 测试的时候，chatId为1
 */
const loadChat = async (chatId) => {
  try {
    const data = await AsyncStorage.getItem(`chat_${chatId}`);
    console.log(`[${Date.now().toString()}] Messages Fetched!`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(e);
  }
};

const clearChat = async (chatId) => {
  try {
    await AsyncStorage.removeItem(`chat_${chatId}`);
  } catch (e) {
    console.error(e);
  }
};

export { saveChat, loadChat, clearChat };
