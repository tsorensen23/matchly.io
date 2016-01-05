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
        <div className="col-xs-12 text-center">
        <h3>
          We found some invalid Class Visit Times
        </h3>
        <p className="lead">
          Please select the proper lecture numbers for each visitor from the list below or fix your dataset and reupload.
        </p>
          <ul>
            {this.props.finished.data.map( (vis, index) => {
             return (
                   <li>
                    <div className="text-left col-xs-8 col-sm-4 col-sm-offset-2">
                     {vis.First} {vis.Last} {vis['Class Visit Time']}
                     </div>
                     <Selector
                      className="col-xs-4 col-sm-4"
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
            className="btn btn-lg btn-success"
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
