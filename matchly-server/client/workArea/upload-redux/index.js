
import App from './containers/app';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default class UploadRedux extends React.Component{
  render() {
    return (
      <div>
        <App store={store} />
        <DebugPanel right>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>


      </div>
  );
  }
}

