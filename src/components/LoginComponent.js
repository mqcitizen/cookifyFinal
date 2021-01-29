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
//import {Password} from './PasswordTextBoxNative';
import {GlobalContext} from '../context/Provider';

const LoginComponent = ({form, onSubmit, onChange}) => {
  const {navigate} = useNavigation();
  const {
    authState: {error},
  } = useContext(GlobalContext);
  return (
    <Container>
      {error &&
        Alert.alert('Error', JSON.stringify(error), [
          {
            text: 'Cancel',
            onPress: () => {},
          },
        ])}
      <Image
        height={70}
        width={70}
        source={require('../assets/images/logo.png')}
        style={styles.logoImage}
      />

      <View>
        <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subTitle}>Please login here</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Enter Email"
            value={form.email || null}
            onChangeText={(value) => {
              onChange({name: 'email', value});
            }}
          />
          <TextInput
            placeholder="Enter Password"
            value={form.password || null}
            onChangeText={(value) => {
              onChange({name: 'password', value});
            }}
            secureTextEntry={true}
          />
          {/* <Password
            label="Enter Password"
            value={form.password || null}
            onChange={onChange}
          /> */}
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
  },
  linkBtn: {
    paddingLeft: 17,
    color: colors.primary,
    fontSize: 16,
  },

  infoText: {
    fontSize: 17,
  },
});
