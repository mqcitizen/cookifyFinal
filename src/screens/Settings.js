import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, View} from 'react-native';

const gettoken = async () => {
  try {
    return JSON.parse(await AsyncStorage.getItem('user'));
  } catch (e) {
    console.log('Error getting token from asyncstorage');
  }
};
const token = gettoken();
const Settings = () => {
  return (
    <View>
      <Text>Welcome </Text>
    </View>
  );
};

export default Settings;
