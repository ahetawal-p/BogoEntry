import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';

export default function configureStore() {
  const logger = createLogger({
    predicate: (getState, action) => !action.type.includes('@@redux-form')
  });
  const store = createStore(reducer, applyMiddleware(thunk, logger));
  return store;
}
