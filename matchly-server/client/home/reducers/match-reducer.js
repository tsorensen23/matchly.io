export default function matches(state ={isFetching: false, data: [], lastUpdated: 0}, action){
  switch(action.type) {
    case 'SET_DATE_MATCH':
      return Object.assign({}, state, {
        date: action.date
      });
    case 'REQUEST_MATCHES':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_MATCHES':
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: Date.now()
      });
    default:
      return state;
  }
}
