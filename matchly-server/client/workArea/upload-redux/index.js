import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import uploadApp from './reducers';
import { startUpload, changeHeader, changeKey } from './actions';
const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);
function configureStore(initialState) {
  return createStoreWithMiddleware(uploadApp, initialState);
}

var store = configureStore();

import App from './containers/app';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';

export default class UploadRedux extends React.Component{
  render() {
    return (
      <App store={store} />
  );
  }
}

