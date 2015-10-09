var React = require('react');
var HostStore = require('../../Stores/HostStore');

var AddExceptionDay = React.createClass({
  getInitialState: function() {
    return {
      hosts: []
    };
  },

  componentWillMount: function() {
    HostStore.getAll(function(err, hosts) {
      this.setState({hosts:hosts});
    }.bind(this));
  },

  toggleHost: function(host) {
    var index = host.MatchInfo.exceptionDate.indexOf(this.props.date);
    if (index === -1) {
      host.MatchInfo.exceptionDate.push(this.props.date);
    } else {
      host.MatchInfo.exceptionDate.splice(index, 1);
    }

    HostStore.set(host, function(err, hosts) {
      this.setState({hosts:hosts});
    }.bind(this));
  },

  render:function() {
    var toggleHost = this.toggleHost;
    var curDate = this.props.date;
    return (
      <div>
        <div>
          <ul>{this.hosts.map(function(host) {
            var isAvailable = -1 === host.MatchInfo.exceptionDate.indexOf(curDate);
            return (
              <li display={{backgroundColor: isAvailable ? 'green' : 'red'}}>
              <span>{host.FirstName} {host.LastName}</span>
              <button onClick={toggleHost.bind(this, host)}>
                {isAvailable ? 'Not available' : 'Available'} on Date
              </button>
            </li>
            );
          }.bind(this))}</ul>
        </div>
      </div>
    );
  }
});

module.exports = Loading;
