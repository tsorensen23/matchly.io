
import App from './containers/app';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default class UploadRedux extends React.Component{
  render() {
    return (
      <div>
      <div className="col-sm-offset-3 col-sm-9">
        <App store={store} location={this.props.location} history={this.props.history} context={this.props.context}/>
      </div>
        <DebugPanel top left bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
  );
  }
}

