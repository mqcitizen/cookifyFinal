import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import {LOGOUT, SETTINGS} from '../constants/routeNames';
import {HOME_NAVIGATOR} from '../constants/routeNames';
import {Pressable, Text, View} from 'react-native';

const SideMenu = (navigation) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate(SETTINGS);
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          {
            borderRadius: 8,
            padding: 6,
          },
        ]}>
        <Text>Settings</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate(LOGOUT);
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          {
            borderRadius: 8,
            padding: 6,
          },
        ]}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={({navigation}) => SideMenu(navigation)}>
      <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
