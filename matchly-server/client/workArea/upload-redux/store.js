
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import uploadApp from './reducers';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);
function configureStore(initialState) {
  return createStoreWithMiddleware(uploadApp, initialState);
}

var store = configureStore();
export default store;