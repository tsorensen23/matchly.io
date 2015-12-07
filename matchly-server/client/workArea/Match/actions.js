// always wrap your actions in a dispatch!!!!

function requestHosts(){
  return { type: 'REQUEST_HOSTS' }
}
function receiveHosts(data) {
  return { type: 'RECEIVE_HOSTS', data}
}
export function getAllHosts() {
  return function(dispatch){
    dispatch(requestHosts());
    fetch('/hosts', {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(json =>
      dispatch(receiveHosts(json))
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
    fetch(`/visitors?date=${date.toISOString()}`, {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(json => {
      console.log(json);
      dispatch(receiveVisitors(json))
    });
  };
}

export function setDate(date){
  return { type: 'SET_DATE', date};
}
function requestMatches(){
  return { type: 'REQUEST_MATCHES' };
}
function receiveMatches(data) {
  console.log('hit this2');
  return { type: 'RECEIVE_MATCHES', data};
}
export function getMatches() {
  return function(dispatch, getState){
    dispatch(requestMatches());
    var date = getState().matches.date;
    fetch(`match/?date=${Date.parse(date)}`, {
      credentials: 'same-origin'
    }).then(resp => 
      resp.json()
    ).then(data => 
      dispatch(receiveMatches(data.array))
    );
  };
}
function toggleHostData(data) {
  return { type: 'TOGGLE_HOST', data};
}

export function toggleHost(host, onOff){
  return function(dispatch, getState) {
    var date = getState().matches.date.toString();
    fetch(`/hosts/exception-date?date=${date}&host=${host._id}&onoff=${onOff}`, {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(data => {
      console.log(data, 'in actions');
      dispatch(toggleHostData(data))
    });
  }
}

