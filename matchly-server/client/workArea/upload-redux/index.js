
import App from './containers/app';
import { connect } from 'react-redux';
import React from 'react';

class UploadRedux extends React.Component{
  render() {
    return (
      <div>
          <App {...this.props} />
      </div>
  );
  }
}
function select(state){
  return state;
}

export default connect(select)(UploadRedux);
