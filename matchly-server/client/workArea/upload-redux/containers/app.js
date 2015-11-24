import React from 'react';
import {connect} from 'react-redux';
import ReadableFile from '../components/readable-file';
import { startUpload, changeHeader, changeKey, parseData,  setHeaders, finish, fetchHeaders, updateHeaderOrder } from '../actions';
import FileUpload from '../components/file-upload';
import HeaderMatcher from '../components/header-matcher';
import DataTable from '../components/data-table/index';
import _ from 'lodash';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.props.dispatch(fetchHeaders());
  }
  render(){
    const { dispatch, headers, data, upload, finished } = this.props;
    var options = data.map(e =>
        e.key
        );
    headers.data.forEach(function(e) {
      options.push(e.given);
    });
    options = _.uniq(options);
    var finishHTML;
    if(Array.isArray(this.props.finished)) {
      finishHTML = (
          <DataTable finished={this.props.finished} />
          );
    }
    return (
        <div>
          <FileUpload
          uploadFile={fileData =>
            dispatch(parseData(fileData))
          }
          />
          <HeaderMatcher
            headers={headers.data}
            changeHeader={function(needed, given) {
              dispatch(changeHeader(needed, given));
            }}
            changeKey={function(needed, given) {
              dispatch(changeKey(needed, given));
            }}
            options={options}
            visitors={data}
            />
            <button
              onClick={function() {
                dispatch(updateHeaderOrder());
              }}
            >
              Finish
          </button>
          <h1>This is the finished shit</h1>
          {finishHTML}

            <button onClick={function() {
              dispatch(fetchHeaders());
            }}> CLICK THIS BUTTON</button>
        </div>
        );
  }
}

export default connect(function(state){
  return state;
})(App);
