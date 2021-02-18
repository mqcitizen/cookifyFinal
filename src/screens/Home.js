import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import {GlobalContext} from '../context/Provider';
import {Button} from 'react-native-paper';
import list from '../constants/listProcessed';
import {AutoCompleteTextView} from 'autocompletetextview';
import ModalDropdown from 'react-native-modal-dropdown';

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
  const [recipeName, setRecipeName] = useState('');
  const [recipeQty, setRecipeQty] = useState('');
  const [count, setCount] = useState(0);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAdding(false);
    }, 1000);
  }, [adding]);

  const renderItem = ({item}) => <Item title={item.title} />;
  return (
    <View>
      <Text style={{fontSize: 30}}>
        Welcome Mr. {data?.name || (data?.name && JSON.parse(data?.name))} to
        Cookify!
      </Text>
      <>
        {!adding && (
          <View style={styles.main}>
            <View style={styles.container}>
              <AutoCompleteTextView
                style={styles.auto}
                dataSource={list}
                onTextChange={(text) => {
                  setRecipeName(text);
                }}
                showDropDown={true}
                hint="Ingredient"
                value={''}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.txt}
                placeholder={'Quantity'}
                value={recipeQty}
                keyboardType={'decimal-pad'}
                onChangeText={(text) => {
                  setRecipeQty(text);
                }}
              />
              <ModalDropdown
                options={['kg', 'tablespoon', 'teaspoon', 'gram', 'litre']}
                style={{width: 80}}
                textStyle={{fontSize: 15}}
                defaultValue={'Unit'}
              />
              <Button
                onPress={() => {
                  if (list.includes(recipeName)) {
                    arr.push({title: recipeName, id: count.toString()});
                    setCount(count + 1);
                    console.log(arr);
                  }
                  console.log(recipeName);
                  setAdding(true);
                  setRecipeQty('');
                }}>
                Add
              </Button>
            </View>
          </View>
        )}
      </>
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
  main: {margin: 5, borderWidth: 1, borderRadius: 4, borderColor: '#e3e3e3'},
  auto: {
    height: 60,
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  txt: {
    height: 50,
    flex: 1,
    margin: 5,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 4,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});
