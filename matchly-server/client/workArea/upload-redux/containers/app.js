import React from 'react';
import {connect} from 'react-redux';
import ReadableFile from '../components/readable-file';
import { startUpload, getEmployers, changeHeader, changeKey, parseData, getSchools, getAllSchools, getAllEmployers,  setHeaders, finish, fetchHeaders, updateHeaderOrder, changeValue, addNewAlias, uploadData } from '../actions';
import FileUpload from '../components/file-upload';
import HeaderMatcher from '../components/header-matcher';
import DataTable from '../components/data-table/index';
import _ from 'lodash';
import DatePicker from 'react-datepicker';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.props.dispatch(fetchHeaders());
    this.props.dispatch(getAllSchools());
    this.props.dispatch(getAllEmployers());
  }
  render(){
    const { dispatch, headers, data, upload, finished, employerMatches, schoolMatches, allSchools, allEmployers } = this.props;
    var options = data.map(e =>
        e.key
        );
    options = _.uniq(options);
    var finishHTML;
    if(this.props.finished.length > 0) {
      return (
          <div>
          <DataTable
            getEmployers={() => {
              dispatch(getEmployers());
            }}
            getSchools={ () => {
              dispatch(getSchools());
            }}
            employerMatches={employerMatches}
            schoolMatches={schoolMatches}
            finished={finished}
            addNewAlias={(alias, trueValue, employerBool) => {
              dispatch(addNewAlias(alias, trueValue, employerBool));
            }}
            allSchools={allSchools}
            allEmployers={allEmployers}
            changeValue={(key, oldValue, newValue) => {
              dispatch(changeValue(key, oldValue, newValue));
            }}
          />
          <input type="radio" name="hosts-visitors" value="/hosts" />Hosts
          <input type="radio" name="hosts-visitors" value="/visitors" />Visitors
          <DatePicker 
           selected={Date()}
            onChange={(date){
              dispatch(setDate(data));
            }}
            />
          <button
            onClick={() => {
              var val = $("input[name='hosts-visitors']:checked").val();
              console.log(val);
              dispatch(uploadData(val));
            }}
            >
              Upload
            </button>
          </div>
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
