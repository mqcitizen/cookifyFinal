import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeNavigator from './HomeNavigator';
import Settings from '../screens/Settings';
import SearchRecipes from '../screens/SearchRecipes';
import History from '../screens/History';
import {
  HOME_NAVIGATOR,
  SETTINGS,
  HISTORY,
  SEARCHRECIPES,
} from '../constants/routeNames';

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
        name={SEARCHRECIPES}
        component={SearchRecipes}
        options={{
          tabBarLabel: 'Search',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <Icon name="ios-search-outline" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name={HISTORY}
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <MIcon name="history" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name={SETTINGS}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#d02860',
          tabBarIcon: ({color}) => (
            <Icon name="ios-settings-outline" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
export default BottomTabNavigator;
