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
      return(
          <div className="col-xs-10 col-xs-offset-1">
            <form onSubmit={this.sendClassConstraints}>
              <div className="row">
                <div className="col-sm-offset-2 col-sm-2">
                  <h3 className="text-center">A</h3>
                </div>
                {SECTIONS.slice(1).map(section =>
                  <div className="col-sm-2 text-center">
                    <h3>{section}</h3>
                  </div>
                )}
              </div>
              <hr style={{marginBottom: 0, marginTop: 0}} />
              <div className="row">
                <div className="col-sm-2 text-center">
                  <h3>8:00</h3>
                </div>
                {SECTIONS.map(section => {
                return(
                  <div className="col-sm-2 text-center">
                    <input
                      style={{
                        width: '100%',
                        marginTop: 20,
                        textAlign: 'center'
                      }}
                      required='true'
                      type='number'
                      ref={section+'1'}
                      onChange= {_this.changeHandler.bind(_this, section+'1')}
                      value={availability.data[section+'1'].availableSpots}
                    />
                  </div>
                )
                                    })}
              </div>
              <hr style={{marginBottom: 0}} />
              <div className="row">
                <div className="col-sm-2 text-center">
                  <h3>10:00</h3>
                </div>
                {SECTIONS.map(section => {
                return(
                  <div className="col-sm-2 text-center">
                    <input
                      style={{
                        width: '100%',
                        marginTop: 20,
                        textAlign: 'center'
                      }}
                      required='true'
                      type='number'
                      ref={section+'2'}
                      onChange= {_this.changeHandler.bind(_this, section+'2')}
                      value={availability.data[section+'2'].availableSpots}
                    />
                  </div>
                )
                })}
              </div>
              <hr style={{marginBottom: 0}} />
              <div className="row">
                <div className="col-sm-2 text-center">
                  <h3>11:45</h3>
                </div>
                {SECTIONS.map(section => {
                                      console.log(section + '3');
                                      console.log(availability.data[section+'3']);
                                      
                return(
                <div className="col-sm-2 text-center">
                  <input
                    style={{
                      width: '100%',
                      marginTop: 20,
                      textAlign: 'center'
                    }}
                    required='true'
                    type='number'
                    ref={section+'3'}
                    onChange= {_this.changeHandler.bind(_this, section+'3')}
                    value={availability.data[section+'3'].availableSpots}
                  />
                </div>
                )
                                    })}
              </div>
              <hr style={{marginBottom: 0}} />
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
