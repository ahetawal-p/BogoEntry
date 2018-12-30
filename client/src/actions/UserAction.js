import * as types from './UserActionTypes';
import * as userService from '../service/UserService';
import * as alertActions from './AlertAction';

import { history } from '../helpers';

export function login(values) {
  return dispatch => {
    dispatch({ type: types.LOGIN_REQUEST });
    userService.login(values).then(
      user => {
        dispatch({ type: types.LOGIN_SUCCESS, user });
        history.push('/');
        // dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch({ type: types.LOGIN_FAILURE, error });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

export function logout() {
  return dispatch => {
    userService.logout();
    dispatch({ type: types.LOGOUT });
    history.push('/');
  };
}

export function register(values) {
  return dispatch => {
    dispatch({ type: types.REGISTER_REQUEST });
    userService.register(values).then(
      user => {
        dispatch({ type: types.REGISTER_SUCCESS, user });
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch({ type: types.REGISTER_FAILURE });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
