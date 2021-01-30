import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HOME, LOGOUT, SETTINGS} from '../constants/routeNames';
import Settings from '../screens/Settings';
import Logout from '../screens/Logout';
import Home from '../screens/Home';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={SETTINGS}>
      <HomeStack.Screen name={SETTINGS} component={Settings} />
      <HomeStack.Screen name={HOME} component={Home} />
      <HomeStack.Screen name={LOGOUT} component={Logout} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
