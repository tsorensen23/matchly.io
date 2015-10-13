var React = require('react');

var CrudStore = require('../../Stores/CrudStore');
var HostStore = CrudStore('hosts');
var moment = require('moment');

var AddExceptionDay = React.createClass({
  getInitialState: function() {
    return {
      hosts: void 0
    };
  },

  componentWillMount: function() {
    this.hostListener = function(hosts) {
      console.log('component updated');
      this.setState({hosts:hosts});
    }.bind(this);
    HostStore.on('hosts-updated', this.hostListener);
    HostStore.getAll({});
  },

  componentWillUnMount: function() {
    HostStore.removeListener('hosts-updated', this.hostListener);
  },

  findIndex: function(array, date) {
    if (array.length) console.log(array);
    for (var i = 0; i < array.length; i++) {
      if (moment(array[i]).format() === moment(date).format()) return i;
    }

    return -1;
  },

  toggleHost: function(host, onoff) {

    HostStore.run('/exception-date', {
      date: this.props.date,
      host: host._id,
      onoff
    }, function(error) {
      HostStore.getAll({});
    });
  },

  render:function() {
    var toggleHost = this.toggleHost;
    return (
        <div>
        <h2> Now select the hosts who will be available on that date</h2>
      <table className='table table-condensed'>{this.props.hosts.map(function(host) {
        var isAvailable = -1 === this.findIndex(host.MatchInfo.exceptionDate, this.props.date);
        if (!host.MatchInfo.matchDates) {
          host.MatchInfo.matchDates = host.MatchInfo.matches.map(function(match) {
            return match.date;
          });
        }

        var isTaken = -1 === this.findIndex(host.MatchInfo.matchDates, this.props.date);

        var onoff = isTaken || isAvailable;

        var contact = host.Contact;
        return (
          <tr style={{
              backgroundColor: isAvailable ? '#2ecc71' : isTaken ? 'yellow' : '#E26A6A',
              fontSize: '1.1em'
            }}>
            <td style={{verticalAlign: 'center'}}><span className={`glyphicon ${isAvailable ? 'glyphicon-ok' : 'glyphicon glyphicon-remove'}`} /></td>
            <td style={{verticalAlign: 'center'}}><b>{contact.First}</b></td>
            <td style={{verticalAlign: 'center'}}><b> {contact.Last}</b></td>
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
    );
  }
});

module.exports = AddExceptionDay;
