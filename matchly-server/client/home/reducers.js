import matches from './reducers/match-reducer';
import visitors from './reducers/visitors-reducer';
import hosts from './reducers/hosts-reducer';
import employers from './reducers/employers-reducer';
import schools from './reducers/schools-reducer';
import finished from './reducers/finished-reducer';
import data from  './reducers/data-reducer';
import headers from './reducers/headers-reducer';
import hostsOrVisitors from './reducers/host-or-visitor-reducer';
import employerMatches from './reducers/employer-match-reducer';
import schoolMatches from './reducers/school-match-reducer';
import calendar from './reducers/calendar-reducer';

function upload(state = false, action){
  switch(action.type){
    case 'START_UPLOAD':
      return true;
    case 'SUCCESS_DATA_UPLOAD':
      return false;
    default:
      return false;
  }
}



function wholeState(state = {}, action) {
  switch(action.type) {
    case 'FINISH_HEADER_MATCH':
      var dataArray = state.data;
      var newDataArray = [];
      for (var i = 0; i < dataArray[0].data.length; i++) {
         var dataObject = {};
         newDataArray.push(dataObject);
      }
      dataArray.reduce(function(prev, curr) {
        return curr.data.map(function(dp, index){
          if(dp) {
          prev[index][curr.key] = dp.trim();
          } else {
            prev[index][curr.key] = ' ';
          }
          return prev[index]
        });
      }, newDataArray)
      return Object.assign({}, state, {
        finished: newDataArray
      });
    default:
      return state;
  }
}
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
export default function(state = {}, action = {}) {
  state = wholeState(state, action);
  return {
    hostsOrVisitors: hostsOrVisitors(state.hostsOrVisitors, action),
    upload: upload(state.upload, action),
    schoolMatches: schoolMatches(state.schoolMatches, action),
    employerMatches: employerMatches(state.employerMatches, action),
    headers: headers(state.headers, action),
    data: data(state.data, action),
    finished: finished(state.finished, action),
    allSchools: schools(state.allSchools, action),
    allEmployers: employers(state.allEmployers, action),
    hosts: hosts(state.hosts, action),
    visitors: visitors(state.visitors, action),
    matches: matches(state.matches, action),
    routing: routeReducer(state.routing, action),
    calendar: calendar(state.calendar, action)
  };
}
