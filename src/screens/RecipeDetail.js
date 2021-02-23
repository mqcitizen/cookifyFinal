import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {DIRECTIONS} from '../constants/routeNames';

const Item = ({title, img, item, list, navigation}) => (
  <View style={styles.item}>
    <Image style={styles.logo} source={{uri: img}} />
    <Text style={styles.title}>{title}</Text>
    <View style={styles.more}>
      <View style={styles.morelist}>
        {item.ingredients.map((ing) => {
          if (!list.includes(ing)) {
            return (
              <Text style={{fontSize: 15, color: 'red'}}>
                {'-> ' + ing + ' [missing]'}
              </Text>
            );
          } else {
            return <Text style={{fontSize: 15}}>{'-> ' + ing}</Text>;
          }
        })}
      </View>
    </View>
    <Button
      icon={'skew-more'}
      onPress={() => {
        navigation.navigate(DIRECTIONS, {url: item.source.sourceRecipeUrl});
      }}>
      View Directions
    </Button>
  </View>
);

const Recipes = ({route, navigation}) => {
  const ingredient = route.params?.ingredient;
  const list = route.params?.list || [];

  return (
    <ScrollView>
      <Item
        title={ingredient.name}
        img={ingredient.images[0].hostedLargeUrl}
        item={ingredient}
        list={list}
        navigation={navigation}
      />
    </ScrollView>
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
