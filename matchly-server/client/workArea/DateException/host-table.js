import React from 'react';
import moment from 'moment';

export default class HostTable extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      allHosts: this.props.hosts,
      startIndex: 0,
      currHosts: this.props.hosts.slice(0,6)
    }
  }
  paginateForward(){
    this.setState({
      currHosts: this.state.allHosts.slice(this.state.startIndex + 6, this.state.startIndex + 12),
      startIndex: this.state.startIndex + 6
    });
  }
  paginateBackward(){
    this.setState({
      currHosts: this.state.allHosts.slice(this.state.startIndex - 12, this.state.startIndex - 6),
      startIndex: this.state.startIndex - 12 > 0 ? this.state.startIndex - 12 : 0
    })
  }

  findIndex(array, date) {
    for (var i = 0; i < array.length; i++) {
      if (moment(array[i]).format() === moment(date).format()) return i;
    }

    return -1;
  }
  render() {
    var hosts = this.props;
    console.log(this.state.currhosts);
    return (
        <div
          <button 
            onClick={this.paginateBackward.bind(this)}
          >«
          </button>
          <button 
            onClick={this.paginateForward.bind(this)}
          > »
          </button>
          <table className='table table-condensed'>
            <tbody>
              {this.state.currHosts.map(function(host, index) {
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
                        this.props.toggleHost(host, onoff);
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
    );
  }
}
