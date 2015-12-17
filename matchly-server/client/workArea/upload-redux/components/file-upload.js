import React from 'react';
import ReadableFile from './readable-file';

class FileUpload extends React.Component {
  render() {
    return (

      <ReadableFile
        uploadFile={this.props.uploadFile}
        setHeaders={this.props.setHeaders}
        setHosts={this.props.setHosts}
      />

    );
  }
}
export default FileUpload;
