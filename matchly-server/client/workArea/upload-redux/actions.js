import fetch from 'isomorphic-fetch';
import mpath from 'mpath';

export function startUpload(){
  return { type: 'START_UPLOAD' };
}
export function changeHeader(needed, given){
  return { type: 'CHANGE_HEADER', needed, given}
}
export function changeKey(oldKey, newKey){
  return { type: 'CHANGE_KEY', oldKey, newKey}
}
export function setHeaders(given) {
  return { type: 'SET_HEADERS', given }
}
export function parseData(rawCSV){
  return {type: 'PARSE_DATA', rawCSV };
}
export function initialParse(rawCSV){
  dispatch => dispatch(parseData(rawCSV))
}
export function removeDataPoint(key){
  return { type: 'REMOVE_DATA_KEY', key}
}
export function setHeadersGivenToNeeded(){
  return { type: 'SET_HEADERSGIVEN_TO_NEEDED' }
}

export function finish(){
  return function(dispatch, getState) {
    var data = getState().data;
    var headers = getState().headers;
    var givenArray = mpath.get('given', headers.data);
    var neededArray = mpath.get('needed', headers.data);
    data.forEach(function(dataPoint) {
      let index = givenArray.indexOf(dataPoint.key);
      if(index > -1 ) {
        dispatch(changeKey(headers.data[index].given, headers.data[index].needed));
      } else {
        dispatch(removeDataPoint(dataPoint.key));
      }
    });
    dispatch(finishChangingKeys());
    // dispatch(setHeadersGivenToNeeded());
  }
}
export function finishChangingKeys() {
  return { type: 'FINISH_HEADER_MATCH' };
}

export function getHeadersError(error) {
  return { type: 'GET_HEADERS_ERROR', error };
}

export function getHeaders() {
  return { type: 'GET_HEADERS_BEGIN' };
}
export function receiveHeaders(data) {
  data = Object.keys(data).map(function(e) {
      return { needed: e, given: data[e] };
  });
  return { type: 'GET_HEADERS_SUCCESS', data };
}

export function fetchHeaders() {
  return function(dispatch) {
    dispatch(getHeaders());
    return fetch('/headerOrder', {
      method: 'POST',
      body: JSON.stringify({school: 'Darden'}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(resp =>
      resp.json()
    ).then( data =>
      dispatch(receiveHeaders(data))
    ).catch(err =>
      dispatch(getHeadersError(err))
    );
  };
}
export function updateHeadersError(err) {
  return { type: 'UPDATE_HEADER_ERROR', err};
}
export function updateHeaderOrder(){
  return function(dispatch, getState) {
    var body = getState().headers.data.reduce(function(prev, curr) {
        prev[curr.needed] = curr.given;
        return prev;
    }, {});
    return fetch('updateHeaderOrder', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      dispatch(finish());
    });
  };
}

export function requestEmployerMatch() {
  console.log('hit the dispatch');
  return { type: 'REQUEST_EMPLOYER_MATCHES' };
}
export function receiveEmployers(data){
  return { type: 'RECEIVE_EMPLOYER_MATCHES', data};
}
export function getEmployers(){
  return function(dispatch, getState) {
    dispatch(requestEmployerMatch());
    var employers = mpath.get('Employer', getState().finished);
    var body = {
      employers: employers
    };
    console.log(body);
    return fetch('checkemployers', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then( resp =>{
      return resp.json();
    }).then(data =>{
      data = Object.keys(data).map(function(userEntry) {
        return {
          alias: userEntry,
          value: data[userEntry],
          singleMatch: ((typeof data[userEntry]) === 'string'),
          multipleMatch: Array.isArray(data[userEntry]),
          noValue: data[userEntry] === null
        };
      });
      dispatch(receiveEmployers(data));
    });
  };
}
export function requestSchoolMatch() {
  console.log('hit the dispatch');
  return { type: 'REQUEST_SCHOOL_MATCHES' };
}
export function receiveSchools(data){
  return { type: 'RECEIVE_SCHOOL_MATCHES', data};
}
export function getSchools(){
  return function(dispatch, getState) {
    dispatch(requestSchoolMatch());
    var schools = mpath.get('Undergrad', getState().finished);
    var body = {
      names: schools
    };
    console.log(body);
    return fetch('checkschools', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then( resp =>{
      return resp.json();
    }).then(data =>{
      data = Object.keys(data).map(function(userEntry) {
        return {
          alias: userEntry,
          value: data[userEntry],
          singleMatch: ((typeof data[userEntry]) === 'string'),
          multipleMatch: Array.isArray(data[userEntry]),
          noValue: data[userEntry] === null
        };
      });
      dispatch(receiveSchools(data));
    });
  };
}

export function changeValue(key, oldValue, newValue){
  return { type: 'CHANGE_VALUE', key, oldValue, newValue };
}
