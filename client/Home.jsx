var React = require('react');
var Day = require('./Day.jsx');
var Match = require('./workArea/Match.jsx');
var Available = require('./workArea/Available.jsx');
var Upload = require('./workArea/Upload.jsx');
// var alasql=require('alasql');

var Home = React.createClass({
  getInitialState: function() {
    return {
      name:null,
      indexNumber: 0,
      workNumber:0,
      matchData:null,
      availableData: null,
      loadingIcon: false
    };
  },
  componentDidMount:function() {
    this.getAvailableData();
  },

  setLoadingIcon:function(word) {
    this.setState({loadingIcon:word});
  },

  getAvailableData:function() {
    var self=this;
    $.ajax({
      method: 'GET',
      url: '/getAvailableData',
      success: function(data) {
        console.log("getAvailableData", data[0]);
        self.setState({availableData:data[0]});
      }
    });
  },

  exportCSV:function(matchData){
   var a = document.createElement('a');
    a.href = 'data:application/csv;charset=utf-8,'+encodeURIComponent(matchData);
    a.target = '_blank';
    a.download = 'match-data.csv';
    document.body.appendChild(a);
    a.click();
  },

  setName:function(name){
    this.setState({name:name});
  },
  setMatchData: function(data) {
    console.log('setMatchData fires');
    this.setState({matchData:data});
  },

  setIndexNumber:function(number) {
    this.setState({indexNumber:number});
  },
  setWorkArea:function(number) {
    this.setState({workNumber:number});
  },

  render: function(){
    console.log(this.state.matchData,'matchData');
  // console.log('matchData',this.state.matchData);
  var self=this;
  var workArea=<div></div>
  var workNumber=this.state.workNumber;
  if(workNumber===0) {
    workArea=<Match workNumber={this.state.workNumber}
    setWorkArea={this.setWorkArea}
    indexNumber={this.state.indexNumber}
    setMatchData={this.setMatchData}
    exportCSV={this.exportCSV}
    matchData={this.state.matchData}
    loadingIcon={this.setLoadingIcon} />;
  } else if(workNumber===1) {
    workArea=<Available workNumber={this.state.workNumber}
    setWorkArea={this.setWorkArea}
    indexNumber={this.state.indexNumber} 
    availableData={this.state.availableData}/>;
  } else if(workNumber===2) {
    workArea=<Upload workNumber={this.state.workNumber}
    setWorkArea={this.setWorkArea}
    indexNumber={this.state.indexNumber} />;
  }

    return(
      <div>
        <h1 id="header">MATCHLY</h1>
        <div id='workArea'>
            {workArea}
        </div>
      </div>
    );
  }
});

module.exports=Home;
