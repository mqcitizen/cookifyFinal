import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT_USER} from '../../../constants/actionTypes';

export default () => async (dispatch) => {
  const keys = ['token', 'user'];
  try {
    await AsyncStorage.multiRemove(keys);
    console.log('Removed token and user from asyncstorage');
  } catch (e) {
    console.log('Error removing from async storage');
  }
  dispatch({
    type: LOGOUT_USER,
  });
};
