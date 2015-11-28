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

export function changeKeys(keyArray) {
  return { type: 'CHANGE_KEYS', keyArray}
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
export function removeDataPoints(keys){
  return { type: 'REMOVE_DATA_KEYS', keys}
}

export function finish(){
  return function(dispatch, getState) {
    var data = getState().data;
    var headers = getState().headers;
    var givenArray = mpath.get('given', headers.data);
    var neededArray = mpath.get('needed', headers.data);
    var dropKeys = [];
    var changeKeysArray = [];
    data.forEach(function(dataPoint) {
      let index = givenArray.indexOf(dataPoint.key);
      if(index > -1 ) {
        changeKeysArray.push({
          oldKey: headers.data[index].given,
          newKey: headers.data[index].needed
        });
      } else {
        dropKeys.push(dataPoint.key);
      }
    });
    dispatch(changeKeys(changeKeysArray));
    dispatch(removeDataPoints(dropKeys));
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
      return dispatch(finish());
    }).then( e => {
      dispatch(getSchools());
      dispatch(getEmployers());
    });
  };
}

export function requestEmployerMatch() {
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
  return { type: 'REQUEST_SCHOOL_MATCHES' };
}
export function receiveSchools(data){
  return { type: 'RECEIVE_SCHOOL_MATCHES', data};
}
export function requestAllSchools() {
  return { type: 'REQUEST_SCHOOLS' }
}
export function receiveAllSchools(data) {
  return { type: 'RECEIVE_SCHOOLS', data }
}
export function errorAllSchools(error) {
  return { type: 'SCHOOL_REQUEST_FAIL', error}
}
export function getAllSchools() {
  return function(dispatch) {
    dispatch(requestAllSchools());
    return fetch('schools')
      .catch(err =>
        dispatch(errorAllSchools(err))
      ).then(resp =>
        resp.json()
      ).then(data => {
        dispatch(receiveAllSchools(data))
      });
  }
}
export function getSchools(){
  return function(dispatch, getState) {
    dispatch(requestSchoolMatch());
    var schools = mpath.get('Undergrad', getState().finished);
    var body = {
      names: schools
    };
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
export function requestAllEmployers() {
  return { type: 'REQUEST_EMPLOYERS' }
}
export function receiveAllEmployers(data) {
  return { type: 'RECEIVE_EMPLOYERS', data }
}
export function errorAllEmployers(error) {
  return { type: 'EMPLOYER_REQUEST_FAIL', error}
}
export function getAllEmployers() {
  return function(dispatch) {
    dispatch(requestAllEmployers());
    return fetch('employers')
      .catch(err =>
        dispatch(errorAllEmployers(err))
      ).then(resp =>
        resp.json()
      ).then(data => {
        dispatch(receiveAllEmployers(data))
      });
  }
}

export function changeValue(key, oldValue, newValue){
  return { type: 'CHANGE_VALUE', key, oldValue, newValue };
}
export function addNewAlias(alias, trueValue, employerBool){
  return function(dispatch) {
    var url = employerBool ? 'employerMatch' : 'schoolMatch';
    var body = {
      alias: alias,
      trueValue: trueValue
    };
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((data) => {
      return data.json();
    }).then((json) => {
    })
    .catch((err) =>{
      console.log('error', err);
    });
  };
}
function successUpload() {
  return { type: 'SUCCESS_DATA_UPLOAD' };
}
function errorUpload(err){
  console.error(err);
  return { type: 'ERROR_UPLOAD', err };
}
export function setDate(date){
  return { type: 'SET_DATE', date};
}

export function uploadData(url){
  return function(dispatch, getState){
    var body = getState().finished;
    //TODO take this out when the date box works
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp =>
      dispatch(successUpload())
    ).catch(err =>
      dispatch(errorUpload(err))
    );
  };
}

