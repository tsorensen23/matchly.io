export default function hosts(state = {isFetching: false, data: [], lastUpdated: 0}, action){
  switch(action.type) {
    case 'REQUEST_HOSTS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_HOSTS':
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: Date.now()
      });
    case 'TOGGLE_HOST':
      var index;
      for(var i = 0; i < state.data.length; i++){
        if(state.data[i]._id === action.data.update.hosts[0]._id){
          index = i;
        }
      }
      return Object.assign({}, state, {
        data: [
          ...state.data.slice(0,index),
          action.data.update.hosts[0],
        ...state.data.slice(index + 1)
          ]
      });
    default:
      return state;
  }
}
