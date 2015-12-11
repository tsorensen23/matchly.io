export default function calendar(state ={ startDate: null, endDate: null, data: [], isFetching: false}, action){
  switch(action.type){
    case 'SET_START_END_DATE':
      return Object.assign({}, state, {
        startDate: action.startDate,
        endDate: action.endDate
      });
    case 'REQUEST_CALENDAR':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_CALENDAR':
      return Object.assign({}, state, {
        data: action.data,
        isFetching: false
      });
    default:
      return state;
  }
}
