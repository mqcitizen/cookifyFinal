import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HOME, RECIPES} from '../constants/routeNames';
import Home from '../screens/Home';
import Recipes from '../screens/Recipes';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={HOME}>
      <HomeStack.Screen
        name={HOME}
        component={Home}
        options={{headerStyle: {backgroundColor: '#009387'}}}
      />
      <HomeStack.Screen name={RECIPES} component={Recipes} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
