import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  StatusBar,
  TextInput,
} from 'react-native';
import Icon from '../components/Icon';
//import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  return (
    <KeyboardAvoidingView behavior={'height'} style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <SafeAreaView style={styles.inner}>
          <Icon style={{marginBottom: 20}} />

          {/* <Input
            placeholder={'Enter your email...'}
            style={{marginBottom: 20}}
          />

          <Input
            placeholder={'Enter your password...'}
            style={{marginBottom: 30}}
            secureTextEntry
          /> */}

          <TextInput
            style={{...styles.input}}
            returnKeyType="next"
            placeholder={'Enter your email...'}
          />
          <TextInput
            style={{...styles.input}}
            placeholder={'Enter your password...'}
            secureTextEntry={true}
          />

          <Button text={'Login'} style={{marginBottom: 15}} />

          <Button
            text={'Register'}
            bgColor={'#707070'}
            bgColorPress={'#919191'}
          />
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    height: 40,
    width: 280,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
