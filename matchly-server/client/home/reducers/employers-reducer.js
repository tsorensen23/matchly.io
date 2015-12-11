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
