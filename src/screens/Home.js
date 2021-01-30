//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {GlobalContext} from '../context/Provider';

// const gettoken = async () => {
//   try {
//     return JSON.parse(await AsyncStorage.getItem('user'));
//   } catch (e) {
//     console.log('Error getting token from asyncstorage');
//   }
// };

const Home = ({navigation}) => {
  const {
    authState: {data},
  } = useContext(GlobalContext);
  return (
    <View>
      <Text>
        Welcome Mr. {data?.name || (data?.name && JSON.parse(data?.name))} to
        Cookify!
      </Text>
      <Button
        onPress={() => {
          navigation.jumpTo('Settings2');
        }}>
        Go to Settings
      </Button>
    </View>
  );
};

export default Home;
