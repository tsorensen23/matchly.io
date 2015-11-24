import React from 'react';
import {connect} from 'react-redux';
import ReadableFile from '../components/readable-file';
import { startUpload, getEmployers, changeHeader, changeKey, parseData, getSchools,  setHeaders, finish, fetchHeaders, updateHeaderOrder, changeValue } from '../actions';
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
    const { dispatch, headers, data, upload, finished, employerMatches, schoolMatches } = this.props;
    var options = data.map(e =>
        e.key
        );
    options = _.uniq(options);
    var finishHTML;
    if(this.props.finished.length > 0) {
      return (
          <DataTable
            getEmployers={() => {
              dispatch(getEmployers());
            }}
            getSchools={ () => {
              dispatch(getSchools());
            }}
            employerMatches={employerMatches}
            schoolMatches={schoolMatches}
            finished={this.props.finished}
            changeValue={(key, oldValue, newValue) => {
              dispatch(changeValue(key, oldValue, newValue));
            }}
          />
          );
    } else {
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
        </div>
        );
    }
  }
}

export default connect(function(state){
  return state;
})(App);
