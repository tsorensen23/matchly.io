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

  sendClassConstraints:function(e) {
    e.preventDefault()
    this.myEE.postData();
    var data = this.props.location.query;
    if(data.lecture1Spots) {
      this.props.history.goBack();
    }

  },

  render:function() {
    var _this = this;
    var data = this.props.location.query;
    if(data.lecture1Spots) {
      var html =  `Sorry you were missing ${data.lecture1Spots} spots in lecture 1, ${data.lecture2Spots} spots in lecture 2,and  ${data.lecture3Spots} in Lecture 4`;
    }
    return (
      <div className='classAvailable'>
        <h4>{html}</h4>
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
