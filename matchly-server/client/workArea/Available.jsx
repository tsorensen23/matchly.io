var React = require('react');
var SECTIONS = ['A', 'B', 'C', 'D', 'E'];
var TIMES = ['8:00', '10:00', '11:45'];
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
                    [<h3 className='sections'></h3>]
                    .concat(SECTIONS.map(function(letter) {
                      return <h3 className='sections'>{letter}</h3>;
                    }))
                  }
                </div>
            {TIMES.map(function(time, i) {
              return (
                <div>
                  <h3 className='row-title sections'>{time}</h3>
                  {SECTIONS.map(function(letter) {
                    var cur = letter + (i + 1);
                    return (<input required='true'
                      type='number'
                      className={cur + ' sections'}
                      ref={cur}
                      onChange= {_this.changeHandler.bind(_this, cur)}
                      value={_this.state.availableData ? _this.state.availableData[cur].availableSpots : 0}
                    />);
                  })}
                </div>
              );
            })}
          <input id='updateButton' type='submit' value='Update'></input>
        </form>
      </div>
    );
  }
});

module.exports = Available;
