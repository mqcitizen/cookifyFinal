import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HOME, RECIPES, RECIPEDETAIL, DIRECTIONS} from '../constants/routeNames';
import Home from '../screens/Home';
import Recipes from '../screens/Recipes';
import RecipeDetail from '../screens/RecipeDetail';
import Directions from '../screens/Directions';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={HOME}>
      <HomeStack.Screen
        name={HOME}
        component={Home}
        options={{headerStyle: {backgroundColor: '#009387'}}}
      />
      <HomeStack.Screen
        name={RECIPES}
        component={Recipes}
        options={{headerStyle: {backgroundColor: '#009387'}}}
      />
      <HomeStack.Screen
        name={RECIPEDETAIL}
        component={RecipeDetail}
        options={{headerStyle: {backgroundColor: '#009387'}}}
      />
      <HomeStack.Screen
        name={DIRECTIONS}
        component={Directions}
        options={{headerStyle: {backgroundColor: '#009387'}}}
      />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
