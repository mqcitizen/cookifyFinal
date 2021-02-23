import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import axiosInstance from '../helpers/axiosInstance';

const Item = ({title, img}) => (
  <View style={styles.item}>
    <Image style={styles.logo} source={{uri: img}} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);

  const renderItem = ({item}) => {
    return <Item title={item.name} img={item.images[0].hostedLargeUrl} />;
  };

  useEffect(() => {
    axiosInstance
      .post('/recipes', {page: 18})
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
  },
  title: {
    fontSize: 25,
  },
  logo: {
    width: 200,
    height: 200,
  },
  load: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
});
