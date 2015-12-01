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
      <div className='classAvailable container'>
        <h4>{html}</h4>
        <form onSubmit={this.sendClassConstraints}>
          <div className='topRowTitles'>
            {
              [<span key={113456} className="col-xs-2"></span>]
              .concat(SECTIONS.map(function(letter, index) {
                return <span key={letter+index} className="col-xs-2 text-center lead">{letter}</span>;
              }))
            }
          </div>
          {TIMES.map(function(time, i) {
            return (
              <ul key={time+i}>
                <li>
                  <h3 className='row-title sections'>
                    <span
                      className="col-xs-2 pull-left text-center"
                    >
                      {time}
                    </span>
                    <span>
                      {SECTIONS.map(function(letter, index) {
                      var cur = letter + (i + 1);
                      return (<input required='true'
                        type='number'
                        key={cur}
                        className="col-xs-2"
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
