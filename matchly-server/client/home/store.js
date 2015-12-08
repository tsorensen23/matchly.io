import { compose, createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import { devTools, persistState } from 'redux-devtools';
import createBrowserHistory from 'history/lib/createHashHistory';

const reducer = combineReducers(Object.assign({}, reducers, {
}));

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);
function configureStore(initialState) {
  return createStoreWithMiddleware(reducers, initialState);
}
const store = configureStore();

export default store;
