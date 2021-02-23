//import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN_FAIL, LOGIN_SUCCESS} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import storeData from '../../../helpers/storeData';

export default ({password, email}) => (dispatch) => {
  axiosInstance
    .post('/login', {
      password,
      email,
    })
    .then((res) => {
      //AsyncStorage.setItem('token', res.data.token);
      //AsyncStorage.setItem('user', JSON.stringify(res.data.info));
      storeData('Storing Token', 'token', res.data.token);
      storeData('Storing User', 'user', JSON.stringify(res.data.info));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.info,
      });
      console.log(res.data.token);
      console.log(res.data.info);
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response
          ? err.response.data?.error
          : {error: 'Something went wrong, try again'},
      });
    });
};
