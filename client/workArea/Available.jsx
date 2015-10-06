var React = require('react');
var SECTIONS = ['A','B','C','D','E'];
var TIMES = ['8:00','10:00','11:45'];

var Available = React.createClass({
  sendClassConstraints:function() {

    var dataObject = {};
    for (var i = 0, l = SECTIONS.length; i < l; i++) {
      for (var ii = 0, ll = TIMES.length; ii < ll; ii++) {
        var cur = SECTIONS[i] + (ii + 1);
        dataObject[cur] = {
          availableSpots: parseInt($('.' + cur)),
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
    return (
      <div id='available-box'>
        <div id='date'>
        </div>
        <div id='nav'>
          <div id='tabs'>
            <ul>
              <li id='match' onClick={this.props.setWorkArea.bind(this, 0)}>MATCH</li>
              <li id='available' onClick={this.props.setWorkArea.bind(this, 1)}>AVAILABLE</li>
              <li id='upload' onClick={this.props.setWorkArea.bind(this, 2)}>UPLOAD</li>
            </ul>
        </div>
        </div>
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
                    return (<input required
                      type='number'
                      className={cur + ' sections'}
                      defaultValue={this.props.availableData[cur].availableSpots}
                    />);
                  })}
                </tr>);
              })}
            </table>
            <input id='updateButton' type='submit' value='Update'></input>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Available;
