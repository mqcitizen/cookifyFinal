import React, {useEffect, useContext} from 'react';
import {GlobalContext} from '../context/Provider';
import {ActivityIndicator} from 'react-native';
import logoutUser from '../context/actions/auth/logoutUser';

const Logout = () => {
  const {authDispatch} = useContext(GlobalContext);

  useEffect(() => {
    logoutUser()(authDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ActivityIndicator />;
};

export default Logout;
