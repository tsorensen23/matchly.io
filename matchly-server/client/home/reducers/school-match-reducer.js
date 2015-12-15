export default function schoolMatches(state = {
  isFetching: false,
  lastUpdated: null,
  data: []
}, action) {
  switch(action.type) {
    case 'REQUEST_SCHOOL_MATCHES':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_SCHOOL_MATCHES':
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        data: action.data
      })
    case 'SCHOOL_MATCH_REQUEST_FAIL':
      console.error(action.error);
      return Object.assign({}, state, {
        isFetching: false
      })
    case 'DROP_SCHOOL_MATCH':
      return Object.assign({}, state, {
        data: state.data.map(school =>{
          if(action.school === school.alias){
            school.singleMatch = true;
            school.multipleMatch = false;
            school.noValue = false;
          }
          return school;
        })
      });
    default:
      return state;
  }
}
