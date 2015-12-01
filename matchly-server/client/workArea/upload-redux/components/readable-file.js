
import React from 'react';
import ReactDOM from 'react-dom';
import Baby from 'babyparse';


class ReadableFile extends React.Component{
  read() {
    var data = this.refs.myFile.getDOMNode().files;
    var reader = new FileReader();
    reader.addEventListener('load', function(event) {
      this.props.uploadFile(Baby.parse(event.target.result, {header: true}).data);
    }.bind(this));
    reader.readAsText(data[0]);
  }

  getFileName() {
    return ReactDOM.findDOMNode(this).files[0].name;
  }

  hasFile() {
    return ReactDOM.findDOMNode(this).files.length > 0;
  }

  onChange() {
    if (this.props.onChange){
      this.props.onChange(this);
    }
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label for="inputFile">
            Please Upload Your Visitor file
          </label>
          <input
           type='file'
           ref="myFile"
           id="inputFile"
           name={this.props.name}
           onChange={this.onChange.bind(this)}
           accept=".csv"
           style={{
             margin: '10px auto',
             width: '250px',
             lineHeight: '16px'
           }}
          />
        </div>
        <button
          className="btn btn-success"
          onClick={this.read.bind(this)}
          style={{
            marginTop: '10'
          }}
        >
          Continue
        </button>
      </div>
    );
  }
}
export default ReadableFile;
