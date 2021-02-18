import React, {useContext} from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/theme/colors';
import Container from './Container';
import {useNavigation} from '@react-navigation/native';
import {REGISTER} from '../constants/routeNames';
import {Password} from './PasswordTextBoxNative';
import {GlobalContext} from '../context/Provider';
import {CLEAR_AUTH_STATE} from '../constants/actionTypes';

const LoginComponent = ({form, onSubmit, onChange}) => {
  const {navigate} = useNavigation();
  const {
    authState: {error},
    authDispatch,
  } = useContext(GlobalContext);
  return (
    <Container>
      {error &&
        Alert.alert('Error', error?.error, [
          {
            text: 'Cancel',
            onPress: () => {
              authDispatch({
                type: CLEAR_AUTH_STATE,
              });
            },
          },
        ])}
      <Image
        height={70}
        width={70}
        source={require('../assets/images/logo.png')}
        style={styles.logoImage}
      />

      <View>
        <Text style={styles.title}>Welcome to Cookify</Text>
        <Text style={styles.subTitle}>Please login here</Text>

        <View style={styles.form}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Enter Email"
              value={form.email || null}
              onChangeText={(value) => {
                onChange({name: 'email', value});
              }}
              keyboardType={'email-address'}
            />
          </View>
          <Password
            label={'Enter Password'}
            value={form.password || null}
            onChange={(value) => {
              onChange({name: 'password', value});
            }}
            height={40}
          />
          <Button title="Submit" onPress={onSubmit} />

          <View style={styles.createSection}>
            <Text style={styles.infoText}>Need a new account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(REGISTER);
              }}>
              <Text style={styles.linkBtn}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  logoImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 50,
  },

  title: {
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: '500',
  },

  subTitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },

  form: {
    paddingTop: 20,
  },

  createSection: {
    flexDirection: 'row',
    marginTop: 10,
  },
  linkBtn: {
    paddingLeft: 17,
    color: colors.primary,
    fontSize: 16,
  },

  infoText: {
    fontSize: 17,
  },

  textInput: {
    borderColor: '#e3e3e3',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
});
