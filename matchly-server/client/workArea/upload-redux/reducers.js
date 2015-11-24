/* var state = {
   upload: boolean,
   headers: [
   {
   needed: 'Military',
   given: 'Mstatus'
   }
   ],
   data [
   { key: 'Mstatus',
   data: ['yes','no','veteran']
   }
   ]
   }
   */

import { combineReducers } from 'redux';

function upload(state = false, action){
  switch(action.type){
    case 'START_UPLOAD':
      return true;
    default:
      return false;
  }
}
var initialHeaderState = {
  isFetching: false,
  lastUpdated: void 0,
  data: [
    { needed: 'Military'},
    { needed: 'Country'},
    { needed: 'Citizenship'},
    { needed: 'University'},
    { needed: 'Employer'},
    { needed: 'Industry'},
    { needed: 'City'},
    { needed: 'State'},
    { needed: 'First Name'},
    { needed: 'Last Name'},
    { needed: 'Gender'},
    { needed: 'Class Visit Time'}
  ]
};

function headers(state = initialHeaderState, action){
  switch(action.type) {
    case 'CHANGE_HEADER':
      var index = state.data.map(e => e.needed).indexOf(action.needed);
      return Object.assign({}, state, {
        data: [
        ...state.data.slice(0, index),
        Object.assign({}, state.data[index], {
          given: action.given
        }),
        ...state.data.slice(index + 1)
      ]
      });
    case 'SET_HEADERS':
      return Object.assign({}, state, {
        data: state.data.map(function(header, i){
        header.given = action.given[i];
        return header;
        })
      });
    case 'GET_HEADERS_BEGIN':
        return Object.assign({}, state, {
          isFetching: true
        });
    case 'GET_HEADERS_SUCCESS':
        return Object.assign({}, state, {
          isFetching: false,
          data: action.data
        });
    case 'GET_HEADERS_ERROR':
        console.error(action.error);
        return Object.assign({}, state, {
          isFetching: false
        });

    default:
      return state;
  }
}
function data(state = [{ key: 'Mstatus', data: []}], action){
  switch(action.type) {
    case 'CHANGE_KEY':
      var index = state.map(e => e.key).indexOf(action.oldKey);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          key: action.newKey
        }),
        ...state.slice(index + 1)
      ];
    case 'PARSE_DATA':
      var initialObj = Object.keys(action.rawCSV[0]).map(function(key){
        return { key: key, data: []};
      });
      action.rawCSV.slice(1).forEach(function(visitor) {
        initialObj.forEach(function(element) {
          element.data.push(visitor[element.key]);
        });
      });
      return initialObj;
    default:
      return state;
  }
}

function wholeState(state = {}, action) {
  switch(action.type) {
    case 'FINISH_HEADER_MATCH':
      var given = state.headers.data.map(function(obj) { return obj.given; });
      var dataArray = state.data;
      var newDataArray = [];
      for (var i = 0; i < dataArray[0].data.length; i++) {
       var dataObject = {};
      // dataObject[dataArray[0].key]=dataArray[0].data[i];
       newDataArray.push(dataObject);
      }
      for(var ii = 0; ii < newDataArray.length; ii++) {
       for(var iii = 0; iii < dataArray[ii].data.length; iii++) {
       newDataArray[iii][dataArray[ii].key] = dataArray[ii].data[iii];
       }
      }
      return Object.assign({}, state, {
        finished: newDataArray
      })
    default:
      return state;
  }
}
export default function(state = {}, action = {}) {
  state = wholeState(state, action);
  return {
    upload: upload(state.upload, action),
    headers: headers(state.headers, action),
    data: data(state.data, action),
    finished: state.finished
  };
}
