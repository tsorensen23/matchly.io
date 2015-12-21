var SECTIONS = ['A', 'B', 'C', 'D', 'E'];
var TIMES = ['08:00', '10:00', '11:45'];
var ProgressButton = require('react-progress-button');
import * as actions from './actions';
import Loading from '../Loading.jsx';
import React from 'react';

import {connect} from 'react-redux';

class Available  extends React.Component{
  componentDidMount() {
    this.props.dispatch(actions.getAvailability())
  }
  changeHandler(cur) {
    this.props.dispatch(actions.changeAvailability(cur, this.refs[cur].value));
  }
  sendClassConstraints(e) {
    e.preventDefault();
    this.props.dispatch(actions.submitAvailability(this.refs.button));
  }
  render() {
    var _this = this;
    var data = this.props.location.query;
    const { availability } = this.props;
    if(availability.isFetching) {
      return( <Loading />);
    }
    if(availability.data) {
    return (
      <div>
        <form onSubmit={this.sendClassConstraints}>
          {SECTIONS.map(function(time, i) {
            return (
              <ul className="col-xs-2">
                <li>{time}</li>
                {TIMES.map(function(letter, index) {
                var cur = time + (index + 1);
                return(<li>
                        {cur}
                        <input
                          required='true'
                          type='number'
                          key={cur}
                          ref={cur}
                          onChange= {_this.changeHandler.bind(_this, cur)}
                          value={availability.data[cur].availableSpots}
                      />
                    </li>
                    );

                })}
              </ul>
            );
          })}
          <ProgressButton 
            className="btn btn-primary" 
            ref='button' 
            onClick={this.sendClassConstraints.bind(this)}
          > 
            Submit
          </ProgressButton>
        </form>
      </div>
    );
  }
  return <Loading />
  }
}

module.exports = connect(function(state) {
 return {
   availability: state.availability
 }
})(Available);
