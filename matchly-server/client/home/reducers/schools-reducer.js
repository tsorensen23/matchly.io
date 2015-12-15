export default function schools(state = {
  isFetching: false,
  lastUpdated: null,
  data: []
}, action) {
  switch(action.type) {
    case 'REQUEST_SCHOOLS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_SCHOOLS':
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        data: action.data
      });
    case 'SCHOOL_REQUEST_FAIL':
      console.error(action.error);
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state;
  }
}
