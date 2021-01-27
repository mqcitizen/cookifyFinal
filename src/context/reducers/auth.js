import {
  CLEAR_AUTH_STATE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './actionTypes';

const auth = (state, {type, payload}) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoggedIn: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        data: null,
        isLoggedIn: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_AUTH_STATE:
      return {
        ...state,
        data: null,
        error: null,
      };

    default:
      return state;
  }
};

export default auth;
