import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HOME, LOGOUT, SETTINGS} from '../constants/routeNames';
import Settings from '../screens/Settings';
import Home from '../screens/Home';
import Logout from '../screens/Logout';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={HOME}>
      <HomeStack.Screen
        name={HOME}
        component={Home}
        options={{headerStyle: {backgroundColor: '#009387'}}}
      />
      <HomeStack.Screen name={SETTINGS} component={Settings} />
      <HomeStack.Screen name={LOGOUT} component={Logout} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;
