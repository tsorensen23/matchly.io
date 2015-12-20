
import React from 'react';
import ReactDOM from 'react-dom';
import Baby from 'babyparse';


class ReadableFile extends React.Component{
  read() {
    var data = this.refs.myFile.files;
    var reader = new FileReader();
    reader.addEventListener('load', function(event) {
      this.props.uploadFile(Baby.parse(event.target.result, {header: true, skipEmptyLines: true}).data);
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
        <div className="form-group">
          <label htmlFor="inputFile">
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
        <div className="checkbox">
              <label>
                <input type="checkbox"
                 onClick={() => {
                   console.log(this.props.hostsOrVisitors, ' bool in input');
                   if(this.props.hostsOrVisitors) {
                     this.props.setVisitors();
                   } else {
                     this.props.setHosts();
                   }
                }}
                checked={this.props.hostsOrVisitors}

		/>
                <span style={{margin: '20px 0'}}
                  >
                  These are hosts
                </span>
              </label>
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
