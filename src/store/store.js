import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';

const loggerMiddleware = storeAPI => next => action => {
    console.group('action', action.type)
    console.log('prev state', storeAPI.getState())
    console.log('action', action)
    let result = next(action)
    console.log('next state', storeAPI.getState())
    console.groupEnd()
    return result
  }

  const logger = applyMiddleware(loggerMiddleware);

const store = createStore(reducer, logger);

export default store;