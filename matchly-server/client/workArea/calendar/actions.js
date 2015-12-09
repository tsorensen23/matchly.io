export function setStartEndDate(startDate, endDate){
  return {type: 'SET_START_END_DATE', startDate, endDate};
}
function requestCalendar(){
  return { type: 'REQUEST_CALENDAR'};
}
function receiveCalendar(data){
  return { type: 'RECEIVE_CALENDAR', data};
}
export function getCalendar(){
  return function(dispatch, getState){
    dispatch(requestCalendar());
    var startDate = getState().calendar.startDate;
    var endDate = getState().calendar.endDate;
    fetch(`calendar?startDate=${startDate}&endDate=${endDate}`, {
      credentials: 'same-origin'
    })
    .then(resp =>
      resp.json()
    ).then(data =>
      dispatch(receiveCalendar(data))
    );
  };
}
