import * as type from '../actions/EventTypes';

const initialState = {
  eventCount: 0,
  creatingEvent: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case type.CREATE_UPDATE_REQUEST:
      return { ...state, creatingEvent: true };
    case type.CREATE_UPDATE_SUCCESS:
      return { ...state, creatingEvent: false };
    case type.CREATE_UPDATE_FAILURE:
      return {};
    case type.EVENT_COUNT_REQUEST:
      return {};
    case type.EVENT_COUNT_SUCCESS:
      return { ...state, eventCount: action.eventCount };
    case type.EVENT_COUNT_FAILURE:
      return {};
    default:
      return state;
  }
}
