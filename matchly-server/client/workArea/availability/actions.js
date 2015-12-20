export function getAvailability(dispatch){
  return function() {
    dispatch(requestAvailability());
    fetch(`{process.env.URL}/getAvailableData`, {
      credentials: 'same-origin'
    }).then(resp =>
      resp.json()
    ).then(json =>
      dispatch(receiveAvailability(json))
    )
  }
}
function requestAvailability() {
  return {type: 'REQUEST_AVAILABILITY'}
}
function receiveAvailability(data) {
  return { type: 'RECEIVE_AVAILABILITY', data}
}
