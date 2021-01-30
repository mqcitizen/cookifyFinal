import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeNavigator from './HomeNavigator';
import Settings from '../screens/Settings';
import {HOME_NAVIGATOR, SETTINGS} from '../constants/routeNames';

const BottomTab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName={HOME_NAVIGATOR} activeColor="#fff">
      <BottomTab.Screen
        name={HOME_NAVIGATOR}
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name={SETTINGS}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings1"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings2"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#d02860',
          tabBarIcon: ({color}) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
export default BottomTabNavigator;
