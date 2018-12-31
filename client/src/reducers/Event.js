import * as type from '../actions/EventTypes';
import { LOGOUT } from '../actions/UserActionTypes';

const initialState = {
  eventCount: 0,
  creatingEvent: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case type.CREATE_UPDATE_REQUEST:
      return { ...state, creatingEvent: true };
    case type.CREATE_UPDATE_SUCCESS:
      return {
        ...state,
        creatingEvent: false,
        eventCount: action.response.eventCount
      };
    case type.CREATE_UPDATE_FAILURE:
      return {};
    case type.EVENT_COUNT_REQUEST:
      return {};
    case type.EVENT_COUNT_SUCCESS:
      return { ...state, eventCount: action.response.eventCount };
    case type.EVENT_COUNT_FAILURE:
      return initialState;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
