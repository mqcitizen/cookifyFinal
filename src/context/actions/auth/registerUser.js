import {REGISTER_FAIL, REGISTER_SUCCESS} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import storeData from '../../../helpers/storeData';

export default ({email, password, name}) => (dispatch) => {
  axiosInstance
    .post('/register', {
      email,
      password,
      name,
    })
    .then((res) => {
      storeData('Storing Token', 'token', res.data.token);
      storeData('Storing User', 'user', JSON.stringify(res.data.info));
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      console.log(res.data.token);
      console.log(res.data.info);
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
