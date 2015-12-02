
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import uploadApp from './reducers';
const loggingReducers = logSlowReducers(uploadApp);

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
)(createStore);
function configureStore(initialState) {
  return createStoreWithMiddleware(uploadApp, initialState);
}

var store = configureStore();
export default store;
