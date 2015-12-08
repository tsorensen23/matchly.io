var React = require('react');

import {connect} from 'react-redux';
var CrudStore = require('../../Stores/CrudStore');
var HostStore = CrudStore('hosts');
var moment = require('moment');
import * as actions from '../Match/actions';

var AddExceptionDay = React.createClass({
  findIndex: function(array, date) {
    for (var i = 0; i < array.length; i++) {
      if (moment(array[i]).format() === moment(date).format()) return i;
    }

    return -1;
  },

  toggleHost: function(host, onoff) {
    this.props.toggleHost(host, onoff);
  },

  render:function() {
    var toggleHost = this.toggleHost;
    return (
        <div>
        <h2> Now select the hosts who will be available on that date</h2>
        <div style={{
          height: '300px',
          overflowY: 'scroll',
          marginBottom: '10',
          border: '1px solid rgba(100, 100, 100, 0.5)'
        }}>
          <table className='table table-condensed'>
            <tbody>
              {this.props.hosts.data.map(function(host, index) {
              var isAvailable = -1 === this.findIndex(host.MatchInfo.exceptionDate, this.props.date);
              if (!host.MatchInfo.matchDates) {
                host.MatchInfo.matchDates = host.MatchInfo.matches.map(function(match) {
                  return match.date;
                });
              }

              // if (host.MatchInfo.matches.length) console.log('matches', host.MatchInfo.matches);

              var takenIndex = -1;
              var isTaken = false;
              if (isAvailable) {
                takenIndex = this.findIndex(host.MatchInfo.matchDates, this.props.date);
                isTaken = -1 !== takenIndex;
              }

              var onoff = isAvailable;

              var contact = host.Contact;
              return (
                <tr key={contact.First + contact.Last + index} style={{
                    backgroundColor: !isAvailable ? '#E26A6A' : isTaken ? 'yellow' : '#2ecc71',
                    fontSize: '1.1em', borderBottom: '1px solid rgba(250, 250, 250, 0.5)'
                  }}>
                  <td style={{
                    verticalAlign: 'middle',
                    textShadow: '1px 1px 1px rgba(250, 250, 250, 0.5)',
                    paddingLeft: '5px'
                  }}><span className={`glyphicon ${isAvailable ? 'glyphicon-ok' : 'glyphicon glyphicon-remove'}`} /></td>
                  <td style={{
                    verticalAlign: 'middle',
                    textShadow: '1px 1px 1px rgba(250, 250, 250, 0.5)'
                  }}>
                    <b>{contact.First}</b>
                  </td>
                  <td style={{
                    verticalAlign: 'middle',
                    textShadow: '1px 1px 1px rgba(250, 250, 250, 0.5)'
                  }}>
                    <b> {contact.Last}</b>
                  </td>
                  <td style={{
                    verticalAlign: 'middle',
                    textShadow: '1px 1px 1px rgba(250, 250, 250, 0.5)'
                  }}>
                    <b>{
                    isTaken ? 'Has Visitor' : isAvailable ? 'Is Available' : 'Is Unavailable'
                  }</b>
                  </td>
                  <td style={{
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                    <button
                      className={`btn btn-default`}
                      style={{
                        width: '200',
                        padding: '5',
                        margin: '5',
                        color: 'black',
                        outline: 'none',
                        textShadow: '1px 1px 1px rgba(250, 250, 250, 0.5)'
                      }}
                      onClick={() => {
                        this.toggleHost(host, onoff);
                      }}
                    >
                      {onoff ? 'Make Unavailable' : 'Make Available'} on Date
                    </button>
                  </td>
                </tr>
              );
            }.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports =connect(function(state) {
 return state;
})(AddExceptionDay);
