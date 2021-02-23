import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {GlobalContext} from '../context/Provider';
import logoutUser from '../context/actions/auth/logoutUser';

const Settings = () => {
  const {authDispatch} = useContext(GlobalContext);
  return (
    <>
      <View>
        <Text>Welcome </Text>
        <Button
          onPress={() => {
            logoutUser()(authDispatch);
          }}>
          Logout
        </Button>
      </View>
    </>
  );
};

export default Settings;
