import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {GlobalContext} from '../context/Provider';
import {Button, TextInput} from 'react-native-paper';
import list from '../constants/listProcessed';
import {AutoCompleteTextView} from 'autocompletetextview';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const arr = [];

const Home = ({navigation}) => {
  const {
    authState: {data},
  } = useContext(GlobalContext);
  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);

  const renderItem = ({item}) => <Item title={item.title} />;
  return (
    <View>
      <Text style={{fontSize: 33}}>
        Welcome Mr. {data?.name || (data?.name && JSON.parse(data?.name))} to
        Cookify!
      </Text>
      <Button
        onPress={() => {
          navigation.jumpTo('Settings2');
        }}>
        Go to Settings
      </Button>
      <View style={styles.container}>
        <AutoCompleteTextView
          style={styles.auto}
          dataSource={list}
          onTextChange={(text) => {
            if (list.includes(text)) {
              arr.push({title: text, id: count.toString()});
              setCount(count + 1);
              console.log(arr);
            }
          }}
          showDropDown={true}
          hint="List"
          value={value}
        />
        <TextInput style={styles.txt} />
        <Button onPress={() => {}}>Add</Button>
      </View>
      <FlatList
        data={arr}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  auto: {
    height: 60,
    flex: 1,
    alignSelf: 'stretch',
  },
  item: {
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  txt: {height: 50, flex: 1},
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
});
