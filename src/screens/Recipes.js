import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import axiosInstance from '../helpers/axiosInstance';
import {RECIPEDETAIL} from '../constants/routeNames';

const Item = ({title, img, item, list, navigation}) => (
  <View style={styles.item}>
    <Image style={styles.logo} source={{uri: img}} />
    <Text style={styles.title}>{title}</Text>
    <View style={styles.more}>
      <Text style={styles.moreTitle}>
        You'll need {item.ingredients.length - list.length} more ingredients
      </Text>
      <View style={styles.morelist}>
        {item.ingredients.map((ing) => {
          if (!list.includes(ing)) {
            return <Text style={{fontSize: 15}}>{ing}</Text>;
          }
        })}
      </View>
    </View>
    <Button
      icon={'skew-more'}
      onPress={() => {
        navigation.navigate(RECIPEDETAIL, {list: list, ingredient: item});
      }}>
      View Details
    </Button>
  </View>
);

const Recipes = ({route, navigation}) => {
  const [recipeList, setRecipeList] = useState([]);

  const list = route.params?.list;

  const renderItem = ({item}) => {
    return (
      <Item
        title={item.name}
        img={item.images[0].hostedLargeUrl}
        item={item}
        list={list}
        navigation={navigation}
      />
    );
  };

  useEffect(() => {
    axiosInstance
      .post('/findRecipes', {list: list})
      .then((res) => {
        setRecipeList(res.data.recipesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      {recipeList && (
        <FlatList
          data={recipeList}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return (
              <View style={styles.load}>
                <ActivityIndicator
                  style={{flex: 1}}
                  size="large"
                  color="#00ff00"
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#000',
    backgroundColor: '#f9c2ff',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e3e3e3',
  },
  more: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e3e3e3',
  },
  morelist: {
    margin: 5,
  },
  title: {
    fontSize: 25,
  },
  moreTitle: {
    margin: 5,
    marginBottom: 0,
    fontSize: 20,
  },
  logo: {
    width: 326,
    height: 200,
  },
  load: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
});
