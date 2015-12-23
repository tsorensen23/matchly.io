export default function data(state = [], action){
  switch(action.type) {
    case 'CHANGE_KEY':
      var currentKeys = state.map(e =>
          e.key
          );
      var index = currentKeys.indexOf(action.oldKey);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          key: action.newKey
        }),
        ...state.slice(index + 1)
      ];
    case 'CHANGE_KEYS':
      var keyArray = action.keyArray;
      var oldKeys = keyArray.map(e =>
          e.oldKey
          );
      var newKeys = keyArray.map(e =>
          e.newKey
          )
      return state.map(function(datapoint){
        var index= oldKeys.indexOf(datapoint.key);
        if(index > -1) {
          return Object.assign({}, datapoint, {
            key: newKeys[index]
          });
        } else {
          return datapoint;
        }
      });
    case 'PARSE_DATA':
      var initialObj = Object.keys(action.rawCSV[0]).map(function(key){
        return { key: key, data: []};
      });
      action.rawCSV.forEach(function(visitor) {
        initialObj.forEach(function(element) {
          element.data.push(visitor[element.key]);
        });
      });
      return initialObj;
    case 'REMOVE_DATA_KEY':
      var index = state.map(e => e.key).indexOf(action.key);
      return state.filter(e =>
                  e.key != action.key
                  );
    case 'REMOVE_DATA_KEYS':
      return state.filter(function(e) {
          if(action.keys.indexOf(e.key) > -1) {
            return false;
          } else {
            return true;
          }
      });
    case 'CLEAR_PREV_DATA':
      return [];
    default:
      return state;
  }
}
