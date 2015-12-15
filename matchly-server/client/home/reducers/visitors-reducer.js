export default function visitors(state = {
  isFetching: false,
  data: [],
  lastUpdated: null
}, action){
  switch(action.type) {
    case 'REQUEST_VISITORS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_VISITORS':
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: Date.now()
      });
    default:
      return state;
  }
}
