import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import {GlobalContext} from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import loadData from '../context/actions/auth/loadData';

const AppNavContainer = () => {
  const {
    authState: {isLoggedIn},
    authDispatch,
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = React.useState(false);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          console.log('app nav ' + user);
          setAuthLoaded(true);
          setIsAuthenticated(true);
          loadData(JSON.parse(user))(authDispatch);
        } else {
          setAuthLoaded(true);
          setIsAuthenticated(false);
        }
      } catch (error) {}
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      {authLoaded ? (
        <NavigationContainer>
          {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;
