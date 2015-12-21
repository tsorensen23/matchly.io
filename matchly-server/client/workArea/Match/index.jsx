var React = require('react');
var Match = require('./Match.jsx');
var moment = require('moment');
import { connect} from 'react-redux';
import * as actions from './actions';


var MatchIndex = React.createClass({
  render:function() {
    return (
        <div className="col-xs-12">
          <h3>Matching for {moment(this.props.location.query.date).format('MM/DD')}</h3>
          <div className="col-xs-6 text-center">
            <h3>  
              Matched Hosts
            </h3>
          </div>
          <div className="col-xs-6 text-center">
            <h3>
              Available Hosts
            </h3>
          </div>
          <Match 
            getAllVisitors={() => {
              this.props.dispatch(actions.getAllVisitors());
            }} 
            getMatches={(cb) => {
              this.props.dispatch(actions.getMatches(cb))
            }}
            location={this.props.location} 
            history={this.props.history}  
            date={moment(this.props.location.query.date)} 
          />
      </div>
    );
  }
});

module.exports = connect(function(state){
  return { 
    hosts: state.hosts,
    visitors: state.visitors,
    matches: state.matches
  }
})(MatchIndex);
