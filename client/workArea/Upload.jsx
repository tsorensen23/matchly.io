var React=require('react');
var ParsedDataVisitors=require('./ParsedDataVisitors.jsx');
var ParsedDataHosts=require('./ParsedDataHosts.jsx');
var DataParser = require('./DataParser.jsx');
var EditableTableView = require('../generic/EditableTableView.jsx');
var ButtonList = require('./ButtonList.jsx');
var visitorHeaders = [
  'Contact.First',
  'Contact.Last',
  'MatchInfo.Class Visit Time',
  'Characteristics.Military',
  'Characteristics.Country',
  'Characteristics.Citizenship',
  'Characteristics.Undergrad',
  'Characteristics.Employer',
  'Characteristics.Industry',
  'Characteristics.City',
  'Characteristics.State'
];

var Upload = React.createClass({
  getInitialState: function(){
    return{
      data: null,
      pageView:0,
      hostOrVisitor: null,
      arrayOfIndividuals: null,
      dataArray: null,
      hide: 'hidden',
      fields: null,
      visitorCategories: ['Military', 'Country', 'Citizenship', 'Undergrad', 'Employer', 'Industry', 'City', 'State', 'First', 'Last', 'Gender', 'Class Visit Time']
    };
  },

  componentDidMount: function(){
    document.getElementById("submitButton").disabled = true;
    document.getElementById("confirm-button").disabled = true;
  },
  togglePageView: function() {
    console.log('toggle is called');
    if(this.state.pageView===0){
      return this.setState({pageView:1});
    } 
    if(this.state.pageView === 1){
      return this.setState({pageView:2});      
    }
    return this.setState({pageView: 0});
  },
  populateIndividualArray:function(array) {
    if(array===null) {
      return;
    }
    if(this.state.hostOrVisitor==='host'){
      return array.map(function(element) {
        return(
          <ParsedDataHosts data={element} />
        );
      });
    } else {
      return <EditableTableView headers={visitorHeaders} items={array} />
        /*
        return array.map(function(element) {
          return(
            <ParsedDataVisitors
              data={element} />

          );
        });
        */
      }
  },

  fileupload: function(event) {
    event.preventDefault();
    if(document.getElementById('txtFileUpload').files.length===0){
      alert('no file selected');
    } else {
      this.setState({hostOrVisitor: this.determineHostOrVisitor()});
      var data = document.getElementById('txtFileUpload').files;
      var reader = new FileReader();
      reader.addEventListener('load', function(event) {
        data = Papa.parse(event.target.result, {header:true});
        console.log('data', data);
        this.setState({fields: data.meta.fields});
        // console.log('gulp is working');
        // document.getElementById("confirm-button").disabled = false;
        // this.setState({data: data});
        if(this.state.hostOrVisitor==='visitor') {
          //figure out what to do with returned data
          // console.log('visitor fires');
          this.setState({dataArray: DataParser.parseDataVisitor(data, this.state.fields)});
        } else {
          // console.log('host fires');
          this.setState({dataArray: DataParser.parseDataHost(data)});
        }
      }.bind(this));
      reader.readAsText(data[0]);
      this.togglePageView();
    }
  },

 determineHostOrVisitor:function() {
  var hostOrVisitor;
  var select = document.getElementsByName('hostOrVisitor');

  for(var i = 0; i<select.length; i++){
    if(select[i].checked === true){
      hostOrVisitor = select[i].value;
    }
  }
  return hostOrVisitor;
},

browserSupportFileUpload: function() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
        }
        return isCompatible;
    },

  toggleSubmit: function() {
    document.getElementById("submitButton").disabled = false;
  },
  fieldsChanger: function(array) {
    // this function is passed down into the button and called when the user reorganizes the headers
  // this function takes an array of category names and sets the data array state to that array
      var payload = this.state.visitorCategories.reduce(function(prev, curr, index){
        prev[curr] = array[index];
        return prev;
      }, { School: Darden})
      $.ajax({
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(payload),
          url: "updateHeaderOrder",
          success: function(data) {
            console.log(data);
          }
      });

      var data = document.getElementById('txtFileUpload').files;
      var reader = new FileReader();
      reader.addEventListener('load', function(event) {
        data = Papa.parse(event.target.result, {header:true});
        document.getElementById("confirm-button").disabled = false;
        // this.setState({data: data});
        if(this.state.hostOrVisitor==='visitor') {
          //figure out what to do with returned data
          // console.log('visitor fires');
          var data =DataParser.parseDataVisitor(data, array);
          this.setState({dataArray: data});
          // console.dir(data);          
        } else {
          // console.log('host fires');
          this.setState({dataArray: DataParser.parseDataHost(data)});
        }
      }.bind(this));
      reader.readAsText(data[0]);
      this.togglePageView();
  },
  submitData: function() {
    var dataArray=this.state.dataArray;
    if(this.state.hostOrVisitor==='host'){
      var url='/submithosts';
    } else {
      var url='/submitvisitors';
      }
      $.ajax({
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(dataArray),
          url: url,
            success: function(data) {
              alert("Success!");
            }.bind(this)
      });
  },

  render: function() {
    console.log('fields state',this.state.fields);
    if(this.state.fields) {
     var buttonstuff = (<ButtonList 
      fields={this.state.fields} 
      fieldsChanger={this.fieldsChanger} 
      categories={this.state.visitorCategories} 
      previousHeaders={this.props.previousHeaders} />);
    }
    var dataView;
    if(this.state.pageView===1) {
      //submitted csv
      dataView=
        (<div>
          {buttonstuff}
        <input id='confirm-button' type='button' value="Confirm Data" onClick={this.togglePageView}></input>
        </div>);
    } else if(this.state.pageView===2) {
      dataView=(
        <div>
        <h2>Visitor Information</h2>
        <div id="array-of-individuals">
          {this.populateIndividualArray(this.state.dataArray)}
        </div>
        <input id='confirm-button' type='button' value="Confirm Data" onClick={this.submitData}></input>
        </div>
      );
    }
    return (
      <div id='Upload-box'>
        <div id="nav">
          <div id='tabs'>
            <ul>
              <li id="match" onClick={this.props.setWorkArea.bind(this,0)}>MATCH</li>
              <li id="available" onClick={this.props.setWorkArea.bind(this,1)}>AVAILABLE</li>
              <li id="upload" onClick={this.props.setWorkArea.bind(this,2)}>UPLOAD</li>
              </ul>
          </div>
        </div>
          <div id="uploadForm">
          <form id='file-form' onSubmit={this.fileupload}>
            <div id='radio-buttons'>
              <input type="radio" name='hostOrVisitor' onClick={this.toggleSubmit} value="host" required> Hosts</input>
              <br></br>
              <input type="radio" name='hostOrVisitor' onClick={this.toggleSubmit} value="visitor"> Visitors</input>
            </div>
            <div id="dvImportSegments" class="fileupload ">
                <legend>Upload your CSV File</legend>
                <input type="file" name="File Upload" id="txtFileUpload" accept=".csv" />
            </div>
            <input id='submitButton' type='submit'></input>
          </form>
          </div>
            {dataView}
      </div>
    );
  }
});

module.exports=Upload;
