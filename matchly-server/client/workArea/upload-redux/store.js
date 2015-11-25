
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import uploadApp from './reducers';
import { devTools, persistState } from 'redux-devtools';
import logSlowReducers from 'redux-log-slow-reducers';
const loggingReducers = logSlowReducers(uploadApp);

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    logSlowReducers
)(createStore);
function configureStore(initialState) {
  return createStoreWithMiddleware(uploadApp, initialState);
}

var store = configureStore();
export default store;
