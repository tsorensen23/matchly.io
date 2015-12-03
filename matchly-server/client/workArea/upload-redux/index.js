
import App from './containers/app';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';

export default class UploadRedux extends React.Component{
  render() {
    return (
        <App store={store} location={this.props.location} history={this.props.history} context={this.props.context}/>
  );
  }
}

