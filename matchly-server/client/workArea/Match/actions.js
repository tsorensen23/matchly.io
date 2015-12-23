// always wrap your actions in a dispatch!!!!
import moment from 'moment';
import {pushPath} from 'redux-simple-router';

function requestHosts(){
  return { type: 'REQUEST_HOSTS' }
}
function receiveHosts(data) {
  return { type: 'RECEIVE_HOSTS', data}
}
export function getAllHosts() {
  return function(dispatch){
    dispatch(requestHosts());
    fetch(process.env.URL +'/hosts', {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(json =>
      dispatch(receiveHosts(json))
    ).catch(err =>
      console.log(err)
    );
  };
}
function requestVisitors(){
  return { type: 'REQUEST_VISITORS' }
}
function receiveVisitors(data) {
  return { type: 'RECEIVE_VISITORS', data }
}

export function getAllVisitors() {
  return function(dispatch, getState){
    dispatch(requestVisitors());
    var date = getState().matches.date;
    fetch(`${process.env.URL}/visitors?date=${moment(date).toISOString()}`, {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(json => {
      dispatch(receiveVisitors(json));
    }).then(json => {
      dispatch(getAllCurrMatches(json));
    }).catch(err =>
      console.log(err.stack)
    );
  };
}

export function setDate(date){
  return { type: 'SET_DATE_MATCH', date};
}
function requestMatches(){
  return { type: 'REQUEST_MATCHES' };
}
function receiveMatches(data) {
  return { type: 'RECEIVE_MATCHES', data};
}
function notEnoughSpots(error){
  alert(`Sorry you were missing ${error.lecture1Spots} in lecture 1, ${error.lecture2Spots} in lecture 2, and ${error.lecture3Spots} in lecture 3`);
  return { type: 'NOT_ENOUGH_SPOTS', error}
}
export function getMatches(cb) {
  return function(dispatch, getState){
    dispatch(requestMatches());
    var date = getState().matches.date;
    date = moment(date).toDate();
    return fetch(`${process.env.URL}/match/?date=${Date.parse(date)}`, {
      credentials: 'same-origin'
    }).then(resp => {
      if(resp.status >= 400){
        resp.json().then(json =>
          dispatch(notEnoughSpots(json))
        )
      }
      return resp.json()
    }).then(data =>  {
      dispatch(receiveMatches(data.array));
      cb();
    }).catch(err =>
      console.log(err)
    );
  };
}
function toggleHostData(data) {
  return { type: 'TOGGLE_HOST', data};
}

export function toggleHost(host, onOff){
  return function(dispatch, getState) {
    var date = getState().matches.date.toString();
    fetch(`${process.env.URL}/hosts/exception-date?date=${date}&host=${host._id}&onoff=${onOff}`, {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(data => {
      dispatch(toggleHostData(data))
    });
  }
}

export function getMatchesAndHosts(cb){
  return function(dispatch, getState){
    dispatch(getMatches(cb)).then( res =>
        dispatch(getAllHosts())
        )
  }
}
function removeVisitors(){
  return {type: 'REMOVE_VISITORS' }
}

export function deleteVisitors() {
  return function(dispatch, getState){
    var date = getState().matches.date.toISOString();
    console.log('date is', date);
    fetch(`${process.env.URL}/deletevisitors`,{
      method: 'post',
      body: JSON.stringify({date: date}),
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(resp =>{
        dispatch(removeVisitors());
        dispatch(pushPath('calendar'));
    })
  }

}

function requestCurrMatches(){
  return { type: 'REQUEST_CURR_MATCHES' }
}
function receiveCurrMatches(data) {
  return { type: 'RECEIVE_CURR_MATCHES', data }
}

export function getAllCurrMatches() {
  console.log('matchesFUNC');
  return function(dispatch, getState){
    dispatch(requestCurrMatches());
    var date = getState().matches.date;
    fetch(`${process.env.URL}/currentmatches?date=${moment(date).toISOString()}`, {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(json => {
      //Host Info pulling
      var currHosts = json;
      var currHostIdList = currHosts.data.map(function(i) {
        return i.host;
      });

      var hosts = getState().hosts.data;

      var hostIDs = hosts.map(function(i) {
        return i._id;
      });
      var visitors = getState().visitors.data;

      var visitorIDs = visitors.map(visitor =>
          visitor._id
      )
        //// Rob stuff
      var stuff = json.data.map(dp => {
        var hostIndex = hostIDs.indexOf(dp.host);
        var host = hosts[hostIndex];
        var visitorIndex = visitorIDs.indexOf(dp.visitor);
        var visitor = visitor[visitorIndex];
        return { host: host, visitor: visitor}
      })
      console.log(stuff);
      //rob stuff

      var hostList = currHostIdList.map(function(el) {
        var hostIndex = hostIDs.indexOf(el);
        return hosts[hostIndex];
      })
console.log(hostList, '<hostList>');
      // Visitor Info pulling
console.log(currVisitorList, '<currVisitorList>');
      var matchesTable;
      for (var i = 0; i < visitorIDs.length; i++) {
        var matchInfo =
        matchesTable.push()
      }
      return dispatch(receiveCurrMatches(json));
    }).catch(err =>
      console.log(err.stack)
    );
  };
}
export function clearMatches(){
  return {type: 'CLEAR_MATCHES'}
}
