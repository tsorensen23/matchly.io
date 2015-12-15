import React from 'react';
import {connect} from 'react-redux';
import ReadableFile from '../components/readable-file';
import {
  startUpload,
  setDate,
  getEmployers,
  changeHeader,
  changeKey,
  parseData,
  getSchools,
  getAllSchools,
  getAllEmployers,
  setHeaders,
  finish,
  fetchHeaders,
  updateHeaderOrder,
  changeValue,
  addNewAlias,
  setVisitors,
  setHosts,
  uploadData
} from '../actions';
import ProgressButton from 'react-progress-button'
import FileUpload from '../components/file-upload';
import HeaderMatcher from '../components/header-matcher';
import DataTable from '../components/data-table/index';
import { pushPath } from 'redux-simple-router'
import _ from 'lodash';
var Loading = require('../../Loading.jsx');
var DatePicker = require('react-datepicker');
var moment = require('moment');

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      date: moment(this.props.location.query.date)
    };
  }
  render(){
    const { dispatch, headers, data, upload, finished, employerMatches, schoolMatches, allSchools, allEmployers, hostsOrVisitors } = this.props;
    var options = data.map(e =>
        e.key
        );
    options = _.uniq(options);
    var finishHTML;
    if(this.props.schoolMatches.isFetching ||
        this.props.employerMatches.isFetching ||
        this.props.allSchools.isFetching ||
        this.props.allEmployers.isFetching ||
        this.props.headers.isFetching) {
      return <Loading />;
    }
    if(this.props.finished.data.length > 0) {
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
            finished={finished.data}
            addNewAlias={(alias, trueValue, employerBool) => {
              dispatch(addNewAlias(alias, trueValue, employerBool));
            }}
            allSchools={allSchools}
            allEmployers={allEmployers}
            changeValue={(key, oldValue, newValue) => {
              dispatch(changeValue(key, oldValue, newValue));
            }}
          />
          <ProgressButton
            ref='button'
            className="btn btn-primary"
            onClick={() => {
              dispatch(setDate(this.state.date));
              var url = this.props.hostsOrVisitors ? '/hosts' : '/visitors';
              if(this.props.finished.ready){
                dispatch(uploadData(url));
                window.setTimeout(function() {
                  this.refs.button.success();
                  this.props.history.pushState(null, '/calendar');
                }.bind(this), 1 * 1000)
                this.refs.button.loading();
              } else {
                dispatch(pushPath('/binary'));
              }
              //TODO make this real
            }}
          >
            Upload
          </ProgressButton>
        </div>
      );
    } else {
      if(this.props.data.length === 0) {
        return (
          <div className="col-xs-12 text-center">
            <h3>Uploading for {moment(this.props.location.query.date).format('MM/DD')}</h3>
            <button
              className="btn btn-info"
              style={{margin: '20px 0'}}
              onClick={() => {
                dispatch(setHosts());
              }}
            >
              These are hosts
            </button>
            <FileUpload
              uploadFile={fileData =>
                dispatch(parseData(fileData))
              }
              style={{margin: '10px 0'}}
            />
          </div>
        );
      } else {
        return (
          <div>
            <HeaderMatcher
              headers={headers.data}
              changeHeader={function(needed, given) {
                dispatch(changeHeader(needed, given));
              }}
              options={options}
              visitors={data}
              onFinish={function() {
                  dispatch(updateHeaderOrder());
                }}
            />
          </div>
        );
      }
    }
  }
}
