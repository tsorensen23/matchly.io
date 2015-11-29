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
      const index = state.data.map(e => e.needed).indexOf(action.needed);
      if(index != -1){
        return Object.assign({}, state, {
          data: [
          ...state.data.slice(0, index),
          Object.assign({}, state.data[index], {
            given: action.given
          }),
          ...state.data.slice(index + 1)
        ]
        });
      } else {
        return state;
      }
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
    case 'UPDATE_HEADER_ERROR':
        console.error(action.err);
        return Object.assign({}, state, {
          isFetching: false
        });
    case 'SET_HEADERSGIVEN_TO_NEEDED':
        console.log('made it here');
        return Object.assign({}, state, {
          data: data.map(function(dp){
            dp.given = dp.needed;
            return dp;
          })
        });
    case 'SET_HOSTS':
        return Object.assign({}, state, {
          data: [
            ...state.data,
            {needed: 'Email', given: ''},
            {needed: 'Section', given: ''}
          ]
        });

    default:
      return state;
  }
}
function data(state = [], action){
  switch(action.type) {
    case 'CHANGE_KEY':
      var currentKeys = state.map(e =>
          e.key
          );
      var index = currentKeys.indexOf(action.oldKey);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          key: action.newKey
        }),
        ...state.slice(index + 1)
      ];
    case 'CHANGE_KEYS':
      var keyArray = action.keyArray;
      var oldKeys = keyArray.map(e =>
          e.oldKey
          );
      var newKeys = keyArray.map(e =>
          e.newKey
          )
      return state.map(function(datapoint){
        var index= oldKeys.indexOf(datapoint.key);
        if(index > -1) {
          return Object.assign({}, datapoint, {
            key: newKeys[index]
          });
        } else {
          return datapoint;
        }
      });
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
    case 'REMOVE_DATA_KEY':
      var index = state.map(e => e.key).indexOf(action.key);
      return state.filter(e =>
                  e.key != action.key
                  );
    case 'REMOVE_DATA_KEYS':
      return state.filter(function(e) {
          if(action.keys.indexOf(e.key) > -1) {
            return false;
          } else {
            return true;
          }
      });
    default:
      return state;
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
          prev[index][curr.key] = dp;
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
export default function employerMatches(state = {
  isFetching: false,
  lastUpdated: void 0,
  data: []
}, action) {
  switch(action.type) {
    case 'REQUEST_EMPLOYER_MATCHES':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_EMPLOYER_MATCHES':
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        data: action.data
      });
    case 'EMPLOYER_MATCH_REQUEST_FAIL':
      console.error(action.error);
      return Object.assign({}, state, {
        isFetching: false
      });
    case 'DROP_EMPLOYER_MATCH':
      return Object.assign({}, state, {
        data: state.data.map(employer =>{
          if(action.employer === employer.alias){
            employer.singleMatch = true;
            employer.multipleMatch = false;
            employer.noValue = false;
          }
          return employer;
        })
      });
    default:
      return state;
  }
}
export default function schoolMatches(state = {
  isFetching: false,
  lastUpdated: void 0,
  data: []
}, action) {
  switch(action.type) {
    case 'REQUEST_SCHOOL_MATCHES':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_SCHOOL_MATCHES':
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        data: action.data
      })
    case 'SCHOOL_MATCH_REQUEST_FAIL': 
      console.error(action.error);
      return Object.assign({}, state, {
        isFetching: false
      })
    case 'DROP_SCHOOL_MATCH':
      return Object.assign({}, state, {
        data: state.data.map(school =>{
          if(action.school === school.alias){
            school.singleMatch = true;
            school.multipleMatch = false;
            school.noValue = false;
          }
          return school;
        })
      });
    default:
      return state;
  }
}
export default function finished(state = [], action){
  switch(action.type) {
    case 'CHANGE_VALUE':
      var key = action.key;
      var oldValue = action.oldValue;
      var newValue = action.newValue;
      return state.map(function(visitor) {
        if(visitor[key] == oldValue){
          var obj = {};
          obj[key] = newValue;
          return Object.assign({}, visitor, obj); 
        }
        return visitor;
      })
    case 'SET_DATE': 
      return state.map(function(visitor){
        visitor.visitDate = action.date.toISOString();
        return visitor;
      });
    default:
      return state;
  }
}

export default function schools(state = {
  isFetching: false,
  lastUpdated: void 0,
  data: []
}, action) {
  switch(action.type) {
    case 'REQUEST_SCHOOLS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_SCHOOLS':
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        data: action.data
      });
    case 'SCHOOL_REQUEST_FAIL':
      console.error(action.error);
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state;
  }
}
export default function employers(state = {
  isFetching: false,
  lastUpdated: void 0,
  data: []
}, action) {
  switch(action.type) {
    case 'REQUEST_EMPLOYERS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_EMPLOYERS':
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        data: action.data
      });
    case 'EMPLOYERS_REQUEST_FAIL':
      console.error(action.error);
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}


export default function(state = {}, action = {}) {
  state = wholeState(state, action);
  return {
    upload: upload(state.upload, action),
    schoolMatches: schoolMatches(state.schoolMatches, action),
    employerMatches: employerMatches(state.employerMatches, action),
    headers: headers(state.headers, action),
    data: data(state.data, action),
    finished: finished(state.finished, action),
    allSchools: schools(state.allSchools, action),
    allEmployers: employers(state.allEmployers, action)
  };
}
