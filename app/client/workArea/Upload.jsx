var React=require('react');
var ParsedDataVisitors=require('./ParsedDataVisitors.jsx');
var ParsedDataHosts=require('./ParsedDataHosts.jsx');
var DataParser=require('./DataParser.jsx');
var EditableTableView = require('../generic/EditableTableView.jsx');

var visitorHeaders = [
  'Contact.First', 
  'Contact.Last', 
  'Contact.Email',
  'ClassVisitTime',
  'Characteristics.Military',
  'Characteristics.Country',
  'Characteristics.Citizenship',
  'Characteristics.Undergrad',
  'Characteristics.Employer',
  'Characteristics.Industry',
  'Characteristics.City',
  'Characteristics.State'
];

var Upload=React.createClass({
  getInitialState: function(){
    return{
      data: null,
      hostOrVisitor: null,
      arrayOfIndividuals:null,
      dataArray: null,
      hide: 'hidden',
    };
  },



  componentDidMount: function(){
    document.getElementById("submitButton").disabled = true;
    document.getElementById("confirm-button").disabled = true;
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
      var self=this;
      this.setState({hostOrVisitor: this.determineHostOrVisitor()});
      var data = document.getElementById('txtFileUpload').files;
      var reader = new FileReader();
      reader.addEventListener('load', function(event) {
        var data = Papa.parse(event.target.result, {header:true});
        console.log(data, 'data');
        document.getElementById("confirm-button").disabled = false;
        // self.setState({data: data});
        if(self.state.hostOrVisitor==='visitor') {
          //figure out what to do with returned data
          console.log('visitor fires');
          self.setState({dataArray: DataParser.parseDataVisitor(data)});
        } else {
          console.log('host fires');
          self.setState({dataArray: DataParser.parseDataHost(data)});
        }
      });
      reader.readAsText(data[0]);
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

  submitData:function() {
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

  render:function() {
    return(
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
            <input id='confirm-button' type='button' value="Confirm Data" onClick={this.submitData}></input>
          <div id="array-of-individuals">
            {this.populateIndividualArray(this.state.dataArray)}
          </div>
      </div>
    );
  }
});

module.exports=Upload;
