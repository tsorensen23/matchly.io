var React = require('react');
var SECTIONS = ['A', 'B', 'C', 'D', 'E'];
var TIMES = ['08:00', '10:00', '11:45'];
var MyEE = require('../Stores/AvailabilityStore');

var Available = React.createClass({
  componentDidMount: function() {
    this.myEE = new MyEE();
    this.myEE.on('update state', function(state) {
      this.setState({availableData: state});
    }.bind(this));

  },

  getInitialState: function() {
    return {availableData: void 0};
  },

  changeHandler: function(cur) {
    this.myEE.setValue(cur, this.refs[cur].getDOMNode().value);
  },

  sendClassConstraints:function() {
    this.myEE.postData();
  },

  render:function() {
    var _this = this;
    return (
      <div className='classAvailable'>
        <form onSubmit={this.sendClassConstraints}>
          <div className='topRowTitles'>
            {
              [<span className="col-xs-2"></span>]
              .concat(SECTIONS.map(function(letter) {
                return <span className="col-xs-2 text-center lead">{letter}</span>;
              }))
            }
          </div>
          {TIMES.map(function(time, i) {
            return (
              <ul>
                <li>
                  <h3 className='row-title sections'>{time}
                  <span style={{marginLeft: '15'}}>
                    {SECTIONS.map(function(letter) {
                    var cur = letter + (i + 1);
                    return (<input required='true'
                      type='number'
                      className="col-xs-2 pull-right"
                      ref={cur}
                      onChange= {_this.changeHandler.bind(_this, cur)}
                      value={_this.state.availableData ? _this.state.availableData[cur].availableSpots : 0}
                    />);
                    })}
                  </span>
                  </h3>
                </li>
              </ul>
            );
          })}
          <input className="btn btn-success col-xs-4 col-xs-offset-4" style={{marginTop: '25'}} id='updateButton' type='submit' value='Update'></input>
        </form>
      </div>
    );
  }
});

module.exports = Available;
