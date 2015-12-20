export function getAvailability(){
  return function(dispatch) {
    dispatch(requestAvailability());
    fetch(`${process.env.URL}/getAvailableData`, {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(json =>
      dispatch(receiveAvailability(json[0]))
    )
  }
}
function requestAvailability() {
  return {type: 'REQUEST_AVAILABILITY'}
}
function receiveAvailability(data) {
  return { type: 'RECEIVE_AVAILABILITY', data}
}
export function changeAvailability(key, value){
  return {type: 'CHANGE_AVAILABILITY', key, value}
}
export function submitAvailability(){
  return function(dispatch, getState) {
    // dispatch(postingAvailability());
    var SECTIONS = ['A','B','C','D','E'];
    var TIMES = ['8:00','10:00','11:45'];
    var dataObject = {};
    dataObject.id = getState().availability.data._id;
    for (var i = 0, l = SECTIONS.length; i < l; i++) {
      for (var ii = 0, ll = TIMES.length; ii < ll; ii++) {
        var cur = SECTIONS[i] + (ii + 1);
        var spots =  getState().availability.data[cur].availableSpots;
        dataObject[cur] = {
          availableSpots: spots,
          lowestIndex: null,
          matches: {
            exists: 'yes'
          }
        };
      }
    }
    fetch(`${process.env.URL}/availability`, {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObject),
    }).then(resp =>
      resp.json()
    ).then(json =>
      dispatch(receivedResponse())
      );
  }
}
function receivedResponse(){
  return {type: 'RECEIVED_RESPONSE' }
}
