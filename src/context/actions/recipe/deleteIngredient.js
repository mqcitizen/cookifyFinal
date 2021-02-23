import {ADD_INGREDIENT_FAIL} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';
import getIngredients from '../recipe/getIngredients';

export default (ingredient) => (dispatch) => {
  console.log(ingredient);
  axiosInstance
    .post('/deleteIngredient', {ingredient: ingredient})
    .then((res) => {
      getIngredients(dispatch);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ADD_INGREDIENT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
