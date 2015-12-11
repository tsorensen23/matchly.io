export default function employerMatches(state = {
  isFetching: false,
  lastUpdated: void 0,
  data: []
}, action) {
  switch(action.type) {
    case 'REQUEST_EMPLOYER_MATCHES':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_EMPLOYER_MATCHES':
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        data: action.data
      });
    case 'EMPLOYER_MATCH_REQUEST_FAIL':
      console.error(action.error);
      return Object.assign({}, state, {
        isFetching: false
      });
    case 'DROP_EMPLOYER_MATCH':
      return Object.assign({}, state, {
        data: state.data.map(employer =>{
          if(action.employer === employer.alias){
            employer.singleMatch = true;
            employer.multipleMatch = false;
            employer.noValue = false;
          }
          return employer;
        })
      });
    default:
      return state;
  }
}
