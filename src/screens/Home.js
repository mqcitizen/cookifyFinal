import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, Alert} from 'react-native';
import {GlobalContext} from '../context/Provider';
import {Button} from 'react-native-paper';
import list from '../constants/listProcessed';
import {AutoCompleteTextView} from 'autocompletetextview';
import ModalDropdown from 'react-native-modal-dropdown';
import addIngredient from '../context/actions/recipe/addIngredient';
import deleteIngredient from '../context/actions/recipe/deleteIngredient';
import getIngredients from '../context/actions/recipe/getIngredients';
import {ScrollView} from 'react-native-gesture-handler';
import {RECIPES} from '../constants/routeNames';

const Home = ({navigation}) => {
  const {
    authState: {data},
    recipeState: {iList},
  } = useContext(GlobalContext);

  const {recipeDispatch} = useContext(GlobalContext);

  const [iName, setIName] = useState('');
  const [iListArray, setIListArray] = useState([]);
  const [unit, setUnit] = useState('');
  const [recipeQty, setRecipeQty] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAdding(false);
    }, 1000);
  }, [adding]);

  useEffect(() => {
    getIngredients(recipeDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (iList) {
      setIListArray(
        iList.map((item) => {
          return item.name;
        }),
      );
    }
  }, [iList]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View>
          <Text>{item.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>{item.qty}</Text>
            <Text style={{marginLeft: 5}}>{item.unit}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => {
              Alert.alert(
                `${item.name}`,
                'Are you sure you want to delete this from the Ingredients List?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                  },
                  {
                    text: 'Ok',
                    onPress: () => {
                      deleteIngredient(item)(recipeDispatch);
                    },
                  },
                ],
              );
            }}
            icon={'delete-sweep-outline'}
          />
          <Button onPress={() => {}} icon={'square-edit-outline'} />
        </View>
      </View>
    );
  };

  const dd_onSelect = (idx, value) => {
    setUnit(value);
  };

  const getHeader = () => {
    return (
      <Text style={{textAlign: 'center', fontSize: 20}}>Ingredients List</Text>
    );
  };

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
                  setIName(text);
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
                onSelect={(idx, value) => dd_onSelect(idx, value)}
              />
              <Button
                onPress={() => {
                  if (
                    list.includes(iName) &&
                    recipeQty !== '' &&
                    unit !== '' &&
                    !iListArray.includes(iName)
                  ) {
                    let ingredient = {};
                    ingredient.name = iName;
                    ingredient.qty = parseInt(recipeQty);
                    ingredient.unit = unit;
                    console.log(ingredient);
                    addIngredient(ingredient)(recipeDispatch);
                    setAdding(true);
                    setRecipeQty('');
                    setIName('');
                  }
                }}>
                Add
              </Button>
            </View>
          </View>
        )}
      </>
      <ScrollView style={styles.sv}>
        <FlatList
          data={iList}
          renderItem={renderItem}
          keyExtractor={(item) => item.uuid}
          ListHeaderComponent={getHeader}
          ListFooterComponent={() => null}
          ListEmptyComponent={() => {
            return <Text>Nothing Here</Text>;
          }}
        />
      </ScrollView>
      <View style={styles.btn}>
        <Button
          onPress={() => {
            navigation.navigate(RECIPES, {list: iListArray});
          }}
          icon="text-box-search-outline">
          Search
        </Button>
        <Button
          icon={'refresh'}
          onPress={() => {
            getIngredients(recipeDispatch);
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e3e3e3',
  },
  auto: {
    height: 60,
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e3e3e3',
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
  btn: {
    display: 'flex',
    padding: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  sv: {
    height: 325,
  },
});
