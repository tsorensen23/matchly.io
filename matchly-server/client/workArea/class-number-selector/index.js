import React from 'react';
import {connect } from 'react-redux';
import * as actions from './actions.js';
import Selector from './selector.js';
import {uploadData} from '../upload-redux/actions.js';
import {pushPath} from 'redux-simple-router';

class ClassNumberSelector extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(actions.initialClassNumber());
  }
  render() {
    const { dispatch, finished } = this.props;
    // var dispatch = this.props.dispatch;
    // var finished = this.props.finished;

    return (
        <div>
        <h3> Your lecture numbers were invalid please select the proper lectures</h3>
          <ul>
            {this.props.finished.data.map( (vis, index) => {
             return (
                   <li>
                     {vis.First} {vis.Last} {vis['Class Visit Time']}
                     <Selector
                       select={(option) => {
                         dispatch(actions.setClassNumber(option, index));
                       }}
                     />
                   </li>
             );
            })
            }
          </ul>
          <button
            onClick={() => {
              dispatch(uploadData());
              dispatch(pushPath('calendar'));
            }}
          >
            Upload Data
          </button>
        </div>
        );
  }
}
export default connect(state => {
    return {
      finished: state.finished
    };
})(ClassNumberSelector)
