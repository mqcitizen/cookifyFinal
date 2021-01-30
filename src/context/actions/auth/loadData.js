import {LOAD_AUTH} from '../../../constants/actionTypes';

export default (user) => (dispatch) => {
  dispatch({
    type: LOAD_AUTH,
    payload: user,
  });
};
