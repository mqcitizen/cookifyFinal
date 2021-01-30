import {
  CLEAR_AUTH_STATE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../../constants/actionTypes';

const auth = (state, {type, payload}) => {
  switch (type) {
    case REGISTER_SUCCESS:
      console.log('registered');
      return {
        ...state,
        data: payload,
        isLoggedIn: true,
      };

    case LOGIN_SUCCESS:
      console.log('loggedin');
      return {
        ...state,
        data: payload,
        isLoggedIn: true,
      };

    case LOGOUT_USER:
      console.log('loggedout');
      return {
        ...state,
        data: null,
        isLoggedIn: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      console.log('login/registerfailed');
      console.log(payload);
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
