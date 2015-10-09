var React = require('react');

var CrudStore = require('../../Stores/CrudStore');
var HostStore = CrudStore('hosts');
var moment = require('moment');

var AddExceptionDay = React.createClass({
  getInitialState: function() {
    return {
      hosts: this.props.hosts
    };
  },

  componentWillMount: function() {
    this.hostListener = function(hosts) {
      console.log('component updated');
      this.setState({hosts:hosts});
    }.bind(this);
    HostStore.on('hosts-updated', this.hostListener);
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

  toggleHost: function(host) {
    var newArray = host.MatchInfo.exceptionDate.slice();
    var index = this.findIndex(host.MatchInfo.exceptionDate, this.props.date);
    if (index === -1) {
      newArray.push(date);
    } else {
      newArray.splice(index, 1);
    }

    HostStore.set(host, {'MatchInfo.exceptionDate': newArray});
  },

  render:function() {
    var toggleHost = this.toggleHost;
    return (
      <ul>{this.props.hosts.map(function(host) {
        var isAvailable = -1 === this.findIndex(host.MatchInfo.exceptionDate, this.props.date);
        var contact = host.Contact;
        return (
          <li display={{backgroundColor: isAvailable ? 'green' : 'red'}}>
            <span>{contact.First} {contact.Last}</span>
            <button onClick={toggleHost.bind(this, host)}>
              {isAvailable ? 'Available' : 'Not available'} on Date
            </button>
          </li>
        );
      }.bind(this))}</ul>
    );
  }
});

module.exports = AddExceptionDay;
