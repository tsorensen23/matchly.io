export default function(state = { isFetching: false}, action) {
  switch(action.type) {
    case 'REQUEST_AVAILABILITY':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_AVAILABILITY':
      return Object.assign({}, state, {
          isFetching: false,
          data: action.data
        });
    case 'CHANGE_AVAILABILITY':
      var cloner = state.data;
      cloner[action.key].availableSpots = action.value;
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, cloner)
      });

    default:
      return state;
  }
}
