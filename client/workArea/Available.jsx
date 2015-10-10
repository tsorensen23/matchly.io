var React = require('react');
var SECTIONS = ['A','B','C','D','E'];
var TIMES = ['8:00','10:00','11:45'];

var Available = React.createClass({
  getInitialState: function() {
    return {availableData: void 0};
  },

  changeHandler: function(cur) {
    var currState = this.state.availableData;
    currState[cur].availableSpots = this.refs[cur].getDOMNode().value;
    this.setState({availableData: currState});
  },

  componentWillMount: function() {
    $.ajax({
      method: 'GET',
      url: '/getAvailableData',
      success: function(data) {
        this.setState({availableData: data[0]});
      }.bind(this)
    });
  },

  sendClassConstraints:function() {

    var dataObject = {};
    for (var i = 0, l = SECTIONS.length; i < l; i++) {
      for (var ii = 0, ll = TIMES.length; ii < ll; ii++) {
        var cur = SECTIONS[i] + (ii + 1);
        var spots =  parseInt($('.' + cur).val());
        dataObject[cur] = {
          availableSpots: spots,
          lowestIndex: null,
          matches: {
            exists: 'yes'
          }
        };
      }
    }

    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataObject),
      url: '/availability',
      success: function(data) {
        alert('success!');
      }.bind(this)
    });
  },

  render:function() {
    var _this = this;
    return (
      <div id='classAvailable'>
        <form onSubmit={this.sendClassConstraints}>
          <table>
              <div id='topRow'>
              <tr>
                <div id='topRowTitles'>
                  {
                    [<h3 className='sections'></h3>]
                    .concat(SECTIONS.map(function(letter) {
                      return <h3 className='sections'>{letter}</h3>;
                    }))
                  }
                </div>
              </tr>
              </div>
            <br></br>
            {TIMES.map(function(time,i) {
              return (<tr>
                <h3 className='row-title sections'>{time}</h3>
                {SECTIONS.map(function(letter) {
                  var cur = letter + (i + 1);
                  return (<input required="true"
                    type='number'
                    className={cur + ' sections'}
                    ref={cur}
                    onChange= {_this.changeHandler.bind(_this, cur)}
                    value={_this.state.availableData ? _this.state.availableData[cur].availableSpots : 0}
                  />);
                })}
              </tr>);
            })}
          </table>
          <input id='updateButton' type='submit' value='Update'></input>
        </form>
      </div>
    );
  }
});

module.exports = Available;
