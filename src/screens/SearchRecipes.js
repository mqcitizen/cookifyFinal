import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, Searchbar} from 'react-native-paper';
import axiosInstance from '../helpers/axiosInstance';
import {RECIPEDETAIL} from '../constants/routeNames';

const Item = ({title, img, item, navigation}) => (
  <View style={styles.itemOut}>
    <View style={styles.item}>
      <Image style={styles.logo} source={{uri: img}} />
      <Text style={styles.title}>{title}</Text>
      <Button
        icon={'skew-more'}
        onPress={() => {
          navigation.navigate(RECIPEDETAIL, {
            list: item.ingredients,
            ingredient: item,
          });
        }}>
        View Details
      </Button>
    </View>
  </View>
);

const SearchRecipes = ({navigation}) => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const renderItem = ({item}) => {
    return (
      <Item
        title={item.name}
        img={item.images[0].hostedLargeUrl}
        navigation={navigation}
        item={item}
      />
    );
  };

  const search = () => {
    setIsLoading(true);
    setRecipeList([]);
    axiosInstance
      .post('/searchRecipes', {searchString: searchQuery})
      .then((res) => {
        setRecipeList(res.data.recipesList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Button
          style={styles.searchBtn}
          mode="contained"
          icon={'text-search'}
          onPress={search}>
          Search
        </Button>
      </View>
      <FlatList
        data={recipeList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          return (
            <View style={styles.load}>
              {isLoading ? (
                <ActivityIndicator
                  style={{flex: 1}}
                  size="large"
                  color="#00ff00"
                />
              ) : (
                <Text>Enter text to Search</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default SearchRecipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#000',
    backgroundColor: '#f9c2ff',
  },
  itemOut: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e3e3e3',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
  logo: {
    width: 292,
    height: 200,
  },
  load: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  searchBtn: {
    margin: 5,
  },
});
