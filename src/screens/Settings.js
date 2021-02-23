import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {GlobalContext} from '../context/Provider';
import logoutUser from '../context/actions/auth/logoutUser';

const Settings = () => {
  const {authDispatch} = useContext(GlobalContext);
  return (
    <View style={styles.main}>
      <View style={styles.sub}>
        <Text>Thanks for Using Our app</Text>
        <Button
          onPress={() => {
            logoutUser()(authDispatch);
          }}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub: {
    flex: 1,
    alignItems: 'center',
  },
  text: {fontSize: 32},
});
