import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {GlobalContext} from '../context/Provider';
import {Button} from 'react-native-paper';
import list from '../constants/listProcessed';

const Home = ({navigation}) => {
  const {
    authState: {data},
  } = useContext(GlobalContext);

  return (
    <>
      <View>
        <Text>
          Welcome Mr. {data?.name || (data?.name && JSON.parse(data?.name))} to
          Cookify! {list[0]}
        </Text>
        <Button
          onPress={() => {
            navigation.jumpTo('Settings2');
          }}>
          Go to Settings
        </Button>
      </View>
    </>
  );
};

export default Home;
