//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {GlobalContext} from '../context/Provider';

// const gettoken = async () => {
//   try {
//     return JSON.parse(await AsyncStorage.getItem('user'));
//   } catch (e) {
//     console.log('Error getting token from asyncstorage');
//   }
// };

const Home = () => {
  const {
    authState: {data},
  } = useContext(GlobalContext);
  console.log(JSON.parse(data).name);
  return (
    <View>
      <Text>Welcome to Cookify! </Text>
    </View>
  );
};

export default Home;
