import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SEARCHRECIPES, RECIPEDETAIL, DIRECTIONS} from '../constants/routeNames';
import SearchRecipes from '../screens/SearchRecipes';
import RecipeDetail from '../screens/RecipeDetail';
import Directions from '../screens/Directions';

const SearchNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={SEARCHRECIPES}>
      <HomeStack.Screen
        name={SEARCHRECIPES}
        component={SearchRecipes}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#1f65ff'},
        }}
      />
      <HomeStack.Screen
        name={RECIPEDETAIL}
        component={RecipeDetail}
        options={{headerStyle: {backgroundColor: '#1f65ff'}}}
      />
      <HomeStack.Screen
        name={DIRECTIONS}
        component={Directions}
        options={{headerStyle: {backgroundColor: '#1f65ff'}}}
      />
    </HomeStack.Navigator>
  );
};
export default SearchNavigator;
