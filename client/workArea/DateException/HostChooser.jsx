var React = require('react');

var CrudStore = require('../../Stores/CrudStore');
var HostStore = CrudStore('hosts');
var moment = require('moment');

var AddExceptionDay = React.createClass({
  getInitialState: function() {
    return {
      hosts: []
    };
  },

  componentWillMount: function() {
    this.hostListener = function(hosts) {
      console.log(hosts);
      this.setState({hosts:hosts.sort(function(a, b) {
        return a.Contact.Last.localeCompare(b.Contact.Last);
      })});
    }.bind(this);
    HostStore.on('hosts-updated', this.hostListener);
    HostStore.getAll({});
  },

  componentWillUnMount: function() {
    HostStore.removeListener('hosts-updated', this.hostListener);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.date !== this.props.date) {
      HostStore.getAll({});
    }

    return true;
  },

  findIndex: function(array, date) {
    for (var i = 0; i < array.length; i++) {
      if (moment(array[i]).format() === moment(date).format()) return i;
    }

    return -1;
  },

  toggleHost: function(host, onoff) {

    HostStore.run('exception-date/', {
      date: this.props.date.toString(),
      host: host._id,
      onoff: onoff
    });
  },

  render:function() {
    var toggleHost = this.toggleHost;
    return (
        <div>
        <h2> Now select the hosts who will be available on that date</h2>
        <div style={{height: '500px', overflowY: 'scroll'}}>
          <table className='table table-condensed'>{this.state.hosts.map(function(host) {
            var isAvailable = -1 === this.findIndex(host.MatchInfo.exceptionDate, this.props.date);
            if (!host.MatchInfo.matchDates) {
              host.MatchInfo.matchDates = host.MatchInfo.matches.map(function(match) {
                return match.date;
              });
            }

            if (host.MatchInfo.matches.length) console.log('matches', host.MatchInfo.matches);

            var takenIndex = -1;
            var isTaken = false;
            if (isAvailable) {
              takenIndex = this.findIndex(host.MatchInfo.matchDates, this.props.date);
              isTaken = -1 !== takenIndex;
            }

            var onoff = isAvailable;

            var contact = host.Contact;
            return (
              <tr style={{
                  backgroundColor: !isAvailable ? '#E26A6A' : isTaken ? 'yellow' : '#2ecc71',
                  fontSize: '1.1em'
                }}>
                <td style={{verticalAlign: 'center'}}><span className={`glyphicon ${isAvailable ? 'glyphicon-ok' : 'glyphicon glyphicon-remove'}`} /></td>
                <td style={{verticalAlign: 'center'}}><b>{contact.First}</b></td>
                <td style={{verticalAlign: 'center'}}><b> {contact.Last}</b></td>
                <td style={{verticalAlign: 'center'}}><b>{
                  isTaken ? 'Has Visitor' : isAvailable ? 'Is Available' : 'Is Unavailable'
                }</b></td>
                <td style={{textAlign: 'right', verticalAlign: 'center'}}>
                  <button className={`btn`}  style={{width: '200', padding: '4'}} onClick={toggleHost.bind(this, host, onoff)}>
                    {onoff ? 'Make Unavailable' : 'Make Available'} on Date
                  </button>
                </td>
              </tr>
            );
          }.bind(this))}
          </table>
        </div>
      </div>
    );
  }
});

module.exports = AddExceptionDay;
