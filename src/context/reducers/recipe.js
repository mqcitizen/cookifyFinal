import {
  GET_INGREDIENT_SUCCESS,
  ADD_INGREDIENT_FAIL,
  GET_INGREDIENT_FAIL,
} from '../../constants/actionTypes';

const contacts = (state, {type, payload}) => {
  switch (type) {
    case GET_INGREDIENT_SUCCESS:
      return {
        ...state,
        iList: payload,
        error: null,
      };
    case GET_INGREDIENT_FAIL:
    case ADD_INGREDIENT_FAIL:
      return {
        ...state,
        error: payload,
      };
  }
};

export default contacts;
