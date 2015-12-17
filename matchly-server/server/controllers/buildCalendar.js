var moment = require('moment');
module.exports = function(visitorDaysArray, matchedDaysArray, startDate, endDate){
  var numOfDays = moment(endDate).diff(moment(startDate), 'days');
  var arr = [];
  for (var i = 0; i < numOfDays; i++) {
    var currDate = moment(startDate).add(i, 'days');
    if(matchedDaysArray.indexOf(currDate.format('YYYY-MM-DD')) > -1){
      arr.push({ date: currDate.format('YYYY-MM-DD'), matched: true, uploaded: false});
      continue;
    }
    if(visitorDaysArray.indexOf(currDate.format('YYYY-MM-DD')) > -1){
      arr.push({ date: currDate.format('YYYY-MM-DD'), matched: false, uploaded: true});
      continue;
    }
    arr.push({ date: currDate.format('YYYY-MM-DD'), matched: false, uploaded: false});
  }
  return arr;
};

