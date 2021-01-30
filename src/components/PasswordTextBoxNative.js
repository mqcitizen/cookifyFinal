import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export const Password = (props) => {
  const [value, onChangeText] = React.useState(props.value);
  const [visible, setVisibility] = React.useState(false);

  const icon = !visible ? 'eye-with-line' : 'eye';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.txtInput}
        onChangeText={(text) => {
          onChangeText(text);
          props.onChange(text);
        }}
        onBlur={() => {}}
        value={value}
        placeholder={props.label}
        secureTextEntry={!visible}
      />
      <Icon
        name={icon}
        color={'#9e9e9e'}
        onPress={() => setVisibility(!visible)}
        style={styles.icons}
      />
    </View>
  );
};
Password.defaultProps = {
  label: 'Text Input',
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  icons: {
    backgroundColor: '#e3e3e3',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 50,
    width: 50,
  },
  txtInput: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
