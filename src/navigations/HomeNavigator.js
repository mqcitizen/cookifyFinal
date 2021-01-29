import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LOGOUT, SETTINGS} from '../constants/routeNames';
import Settings from '../screens/Settings';
import Logout from '../screens/Logout';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={SETTINGS}>
      <HomeStack.Screen name={SETTINGS} component={Settings} />
      <HomeStack.Screen name={LOGOUT} component={Logout} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
