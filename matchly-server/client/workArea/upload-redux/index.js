
import App from './containers/app';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';

export default class UploadRedux extends React.Component{
  render() {
    return (
      <div>
        <App store={store} />
      </div>
  );
  }
}

