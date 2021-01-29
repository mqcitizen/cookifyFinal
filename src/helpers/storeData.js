import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (msg, key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(msg + ' ' + e);
  }
};

export default storeData;
