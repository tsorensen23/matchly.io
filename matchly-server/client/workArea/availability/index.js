var SECTIONS = ['A', 'B', 'C', 'D', 'E'];
var TIMES = ['08:00', '10:00', '11:45'];
var MyEE = require('../../Stores/AvailabilityStore');
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
    e.preventDefault()
    this.props.dispatch(actions.submitAvailability());
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
      <div className='classAvailable container'>
        <form onSubmit={this.sendClassConstraints}>
          <div className='topRowTitles'>
            {
              [<span key={113456} className="col-xs-2"></span>]
              .concat(SECTIONS.map(function(letter, index) {
                return <span key={letter+index} className="col-xs-2 text-center lead">{letter}</span>;
              }))
            }
          </div>
          {TIMES.map(function(time, i) {
            return (
              <ul key={time+i}>
                <li>
                  <h3 className='row-title sections'>
                    <span
                      className="col-xs-2 pull-left text-center"
                    >
                      {time}
                    </span>
                    <span>
                      {SECTIONS.map(function(letter, index) {
                      var cur = letter + (i + 1);
                      return (<input required='true'
                        type='number'
                        key={cur}
                        className="col-xs-2 text-center"
                        ref={cur}
                        onChange= {_this.changeHandler.bind(_this, cur)}
                        value={availability.data[cur].availableSpots}
                      />);
                      })}
                    </span>
                  </h3>
                </li>
              </ul>
            );
          })}
          <ProgressButton 
            className="btn btn-primary" 
            ref='button' 
            onClick={this.sendClassConstraints}
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
