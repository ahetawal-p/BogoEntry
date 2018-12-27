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
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch({ type: types.LOGIN_FAILURE, error });
      }
    );
  };
}

export function logout() {
  return (dispatch, getState) => {
    const state = getState();
    const ticketCount = state.purchase.addedTickets.length;
    dispatch({
      type: types.LOGIN_REQUEST,
      newTicket: {
        id: ticketCount,
        riderType: '',
        riderTypeId: '',
        ticketType: '',
        ticketTypeId: '',
        price: 0,
        qtyValue: 0,
        totalValue: 0
      }
    });
  };
}

export function register(user) {
  return (dispatch, getState) => {
    const state = getState();
    const ticketCount = state.purchase.addedTickets.length;
    dispatch({
      type: types.LOGIN_REQUEST,
      newTicket: {
        id: ticketCount,
        riderType: '',
        riderTypeId: '',
        ticketType: '',
        ticketTypeId: '',
        price: 0,
        qtyValue: 0,
        totalValue: 0
      }
    });
  };
}
