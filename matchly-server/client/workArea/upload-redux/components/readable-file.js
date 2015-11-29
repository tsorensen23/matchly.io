
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
        <div style={{display: 'inline-block', margin: '0 auto'}}>
          <input type='file' ref="myFile" name={this.props.name} onChange={this.onChange.bind(this)} accept={this.props.accept} />
          <button className="btn btn-primary" onClick={this.read.bind(this)}>Click</button>
        </div>
        );
  }
}
export default ReadableFile;
