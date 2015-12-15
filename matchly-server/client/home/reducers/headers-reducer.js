var initialHeaderState = {
  isFetching: false,
  lastUpdated: null,
  data: [
    { needed: 'Military'},
    { needed: 'Country'},
    { needed: 'Citizenship'},
    { needed: 'University'},
    { needed: 'Employer'},
    { needed: 'Industry'},
    { needed: 'City'},
    { needed: 'State'},
    { needed: 'First Name'},
    { needed: 'Last Name'},
    { needed: 'Gender'},
    { needed: 'Class Visit Time'}
  ]
};

export default function headers(state = initialHeaderState, action){
  switch(action.type) {
    case 'CHANGE_HEADER':
      const index = state.data.map(e => e.needed).indexOf(action.needed);
      if(index != -1){
        return Object.assign({}, state, {
          data: [
          ...state.data.slice(0, index),
          Object.assign({}, state.data[index], {
            given: action.given
          }),
          ...state.data.slice(index + 1)
        ]
        });
      } else {
        return state;
      }
    case 'SET_HEADERS':
      return Object.assign({}, state, {
        data: state.data.map(function(header, i){
        header.given = action.given[i];
        return header;
        })
      });
    case 'GET_HEADERS_BEGIN':
        return Object.assign({}, state, {
          isFetching: true
        });
    case 'GET_HEADERS_SUCCESS':
        return Object.assign({}, state, {
          isFetching: false,
          data: action.data
        });
    case 'GET_HEADERS_ERROR':
        console.error(action.error);
        return Object.assign({}, state, {
          isFetching: false
        });
    case 'UPDATE_HEADER_ERROR':
        console.error(action.err);
        return Object.assign({}, state, {
          isFetching: false
        });
    case 'SET_HEADERSGIVEN_TO_NEEDED':
        return Object.assign({}, state, {
          data: state.data.map(function(dp){
            dp.given = dp.needed;
            return dp;
          })
        });
    case 'SET_HOSTS':
    var removeVisits = state.data.filter(function(i) {
      if (i.needed === "Class Visit Time" || i.needed === 'Email' || i.needed === 'Section') {
        return false;
      } else {
        return true;
      }
    });
        return Object.assign({}, state, {
          data: [
            ...removeVisits
            ,
            {needed: 'Email', given: ''},
            {needed: 'Section', given: ''}
          ]
        });

    default:
      return state;
  }
}
