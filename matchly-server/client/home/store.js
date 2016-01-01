import { compose, createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import { devTools, persistState } from 'redux-devtools';
import createBrowserHistory from 'history/lib/createHashHistory';
import persistStateLocal from 'redux-localstorage';


import DevTools from './devTools';
const reducer = combineReducers(Object.assign({}, reducers, {
}));

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = compose(
    persistStateLocal(['allSchools','allEmployers']),
    applyMiddleware(thunkMiddleware),
    DevTools.instrument(),
    persistState(getDebugSessionKey())
)(createStore);
function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

function configureStore(initialState) {
  return createStoreWithMiddleware(reducers, initialState);
}
const store = configureStore();

export default store;
