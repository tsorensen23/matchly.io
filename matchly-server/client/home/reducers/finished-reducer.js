export default function finished(state = { ready: false, data: []}, action){
  switch(action.type) {
    case 'FINISH_HEADER_MATCH':
      var dataArray = action.data;
      var newDataArray = [];
      for (var i = 0; i < dataArray[0].data.length; i++) {
         var dataObject = {};
         newDataArray.push(dataObject);
      }
      dataArray.reduce(function(prev, curr) {
        return curr.data.map(function(dp, index){
          if(dp) {
          prev[index][curr.key] = dp.trim();
          } else {
            prev[index][curr.key] = ' ';
          }
          return prev[index]
        });
      }, newDataArray)
      var haveGender = newDataArray.every((visitor) => {
        return visitor.hasOwnProperty("Gender");
      })
      var haveMilitary = newDataArray.every((visitor) => {
        return visitor.hasOwnProperty("Military");
      })
      return Object.assign({}, state, {
        data: newDataArray,
        ready: haveMilitary === true && haveGender === true

      });
    case 'CHANGE_VALUE':
      var key = action.key;
      var oldValue = action.oldValue;
      var newValue = action.newValue;
      return Object.assign({}, state, {
        data: state.data.map(function(visitor) {
        if(visitor[key] == oldValue){
          var obj = {};
          obj[key] = newValue;
          return Object.assign({}, visitor, obj);
        }
        return visitor;
        })
      });
    case 'SET_DATE':
      var date = action.date.format();
      return Object.assign({}, state, {
        data: state.data.map(function(visitor){
          visitor.visitDate = date;
          return visitor;
        })
      })
    case 'SET_GENDER':
      //TODO Make this so it sets ready to true if and only if military status is there as well
      var hasMil = state.data.every(vis => vis.hasOwnProperty('Military'));
      return Object.assign({}, state, {
        data: state.data.map((visitor) => {
          visitor.Gender = action.gender;
          return visitor;
        }),
        ready: hasMil
      });
    case 'SET_MILITARY':
      var hasGender = state.data.every(vis => vis.hasOwnProperty('Gender'));
      return Object.assign({}, state, {
        data: state.data.map((visitor) => {
          visitor.Military = action.military;
          return visitor;
        }),
        ready: hasGender
      });
    case 'SET_CLASS_NUMBER':
      return Object.assign({}, state, {
        data: [
          ...state.data.slice(0, action.index),
          Object.assign({}, state.data[action.index], {
            classVisitNumber: parseInt(action.classNum)
          }),
          ...state.data.slice(action.index+1)
          ]
      })
    case 'INITIAL_CLASS_NUMBER':
      return Object.assign({}, state, {
        data: state.data.map(visitor => {
          visitor.classVisitNumber = 1;
          return visitor;
        })
      })
    case 'CLEAR_PREV_DATA':
      return Object.assign({}, state, {
        data: []
        }
      );
    default:
      return state;
  }
}
