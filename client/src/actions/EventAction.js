import { reset } from 'redux-form';
import * as types from './EventTypes';
import * as eventService from '../service/EventService';
import * as alertActions from './AlertAction';

import { history } from '../helpers';

export function createEvent(values) {
  return dispatch => {
    dispatch({ type: types.CREATE_UPDATE_REQUEST });
    eventService.createEvent(values).then(
      event => {
        dispatch({ type: types.CREATE_UPDATE_SUCCESS, event });
        history.push('/');
        dispatch(reset('event'));
        dispatch(alertActions.success('Event created successfully'));
      },
      error => {
        dispatch({ type: types.CREATE_UPDATE_FAILURE, error });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

export function getEventCount() {
  return dispatch => {
    dispatch({ type: types.EVENT_COUNT_REQUEST });
    eventService.getEventCount().then(
      eventCount => {
        dispatch({ type: types.EVENT_COUNT_SUCCESS, eventCount });
      },
      error => {
        dispatch({ type: types.EVENT_COUNT_FAILURE, error });
      }
    );
  };
}

export function updateEvent(values) {
  return dispatch => {
    dispatch({ type: types.CREATE_UPDATE_REQUEST });
    eventService.updateEvent(values).then(
      event => {
        dispatch({ type: types.CREATE_UPDATE_SUCCESS, event });
        history.push('/');
      },
      error => {
        dispatch({ type: types.CREATE_UPDATE_FAILURE, error });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
