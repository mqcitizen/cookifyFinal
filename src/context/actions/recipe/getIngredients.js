import {
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAIL,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

export default (dispatch) => {
  axiosInstance
    .post('/getIngredients')
    .then((res) => {
      dispatch({
        type: GET_INGREDIENT_SUCCESS,
        payload: res.data.ingredientsList,
      });
    })
    .catch((err) => {
      console.log('In Get' + err.response.data?.error);
      dispatch({
        type: GET_INGREDIENT_FAIL,
        payload: err.response
          ? err.response.data?.error
          : {error: 'Something went wrong, try again'},
      });
    });
};
