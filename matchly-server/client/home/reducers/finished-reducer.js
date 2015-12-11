export default function finished(state = [], action){
  switch(action.type) {
    case 'CHANGE_VALUE':
      var key = action.key;
      var oldValue = action.oldValue;
      var newValue = action.newValue;
      return state.map(function(visitor) {
        if(visitor[key] == oldValue){
          var obj = {};
          obj[key] = newValue;
          return Object.assign({}, visitor, obj);
        }
        return visitor;
      });
    case 'SET_DATE':
      var date = action.date.format();
      return state.map(function(visitor){
        visitor.visitDate = date;
        return visitor;
      });
    default:
      return state;
  }
}
