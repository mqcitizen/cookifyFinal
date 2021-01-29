import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, View} from 'react-native';

const getname = async () => {
  const name = await AsyncStorage.getItem('user');
  if (name) {
    console.log(JSON.parse(name));
  }
  const user = JSON.parse(name);
  return user;
};

const Settings = () => {
  return (
    <View>
      <Text>Welcome {JSON.stringify(getname())}</Text>
    </View>
  );
};

export default Settings;
