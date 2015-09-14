var React=require('react');
var Visitor=require('./Visitors.jsx');
var Loading=require('./Loading.jsx');
var ProgressButton = require('react-progress-button');

var Match = React.createClass({
  match:function(){
    // console.log(this.props,'props');
    var self=this;
    // this.props
    this.refs.button.loading();
    $.ajax({
      method: 'GET',
      url: '/match',
      success: function(data) {
        // console.log("data", data);
        // console.log(self, 'self');
        self.props.setMatchData(data);
        this.refs.button.success();
      }
    });
  },

  exportToCSV:function(){
    this.props.exportCSV(this.props.matchData.csv);
  },

  render:function(){
    var data=[];
    if(this.props.matchData!==null){
      // console.log('if statement fires');
      // console.log(this.props.matchData.array,'matchData');
      data=this.props.matchData.array.map(function(visitor){
        return (<div><Visitor visitor={visitor} /></div>);
      });
    }
    return(
        <div id='workBox'>
          <div id="nav">
            <div id='tabs'>
              <ul>
                <li id="match" onClick={this.props.setWorkArea.bind(this,0)}>MATCH</li>
                <li id="available" onClick={this.props.setWorkArea.bind(this,1)}>AVAILABLE</li>
                <li id="upload" onClick={this.props.setWorkArea.bind(this,2)}>UPLOAD</li>
              </ul>
            </div>
          </div>
          <div id='workArea'>
            <div id='list-of-visitors'>

            </div>
            <div id='schedule'>

            </div>
            <ProgressButton ref='button' onClick={this.match}>MATCH</ProgressButton>
            <button id='exportButton' onClick={this.exportToCSV}>Export Data to CSV File</button>
          </div>
          <div id="loading">
          </div>
          <div id='data'>
            {data}
          </div>
        </div>

    );
  }
});

module.exports=Match;
