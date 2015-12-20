import React from 'react';
import ReadableFile from './readable-file';

class FileUpload extends React.Component {
  render() {
    return (

      <ReadableFile {...this.props} />

    );
  }
}
export default FileUpload;
