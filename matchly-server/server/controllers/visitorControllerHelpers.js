var moment = require('moment');
var _ = require('lodash');

exports.newVisitors = function(visitor, hasClassVisitNums){
  var newVis = {};
  newVis.Characteristics = {
    Military: visitor.Military,
    Country: visitor.Country,
    Citizenship: visitor.Citizenship,
    Undergrad: visitor.Undergrad,
    Employer: visitor.Employer,
    Industry: visitor.Industry,
    City: visitor.City,
    State: visitor.State,
    Gender: visitor.Gender
  };
  newVis.Contact = {
    First: visitor.First,
    Last: visitor.Last,
  };
  newVis.MatchInfo = {
    'Class Visit Time': visitor['Class Visit Time'],
    visitDate: visitor.visitDate
  };
  if(hasClassVisitNums){
    newVis.MatchInfo.classVisitNumber = visitor.classVisitNumber;
  }
  return newVis;
};

exports.visitTimes = function (visitors, twoSlot) {
  // map through visit times and set to visitTimes array
  // var visitTimes = visitors.map(function(visitor) {
  //   return visitor.MatchInfo['Class Visit Time'];
  // });
  // // pull out only unique visit times of all uploaded times
  // // sanitize the times with moment.js
  // visitTimes = _.map(visitTimes, function(el) {
  //   return moment(el, 'HH:mm:ss A').toObject();
  // });
  // console.log(visitTimes)
  // // map through visitTimes and sort them from smallest to largest
  // visitTimes = sortAndMap(visitTimes);
  // // go through our unique array and given times to place into visiting time slot

  // visitTimes = _.uniq(visitTimes);
  // console.log('starting visit times', visitTimes);
  // // this case handles if there is no 8am and the first visit time needs to be 9am
  // if (visitTimes[0] > 9) {
  //   visitTimes.unshift('0');
  // }
  // // this case handles if there is only 8am and 10am but no 11am and adds one index/value to the visitTimes array
  // if (visitTimes[1] === 10) {
  //   visitTimes.push(3);
  // }
  // // this is for the special case of 9am && 11:45am to have them be an array with length 2
  // if (visitTimes[0] < 9 && visitTimes[1] >= 11) {
  //   visitTimes = [visitTimes[0], 'hiJenna', visitTimes[1]];
  // }
  // console.log('after', visitTimes);
  if (2slot) {
    return ['08', '10', '11'];
  }
  else {
    return ['09', '11'];
  }

  return visitTimes;
};

sortAndMap = function(visitTimes) {
  visitTimes = visitTimes.sort(function (a, b) {
    if (a.hours > b.hours) {
      return 1;
    }
    if (a.hours < b.hours) {
      return -1;
    }
    return 0;
  });
  visitTimes = visitTimes.map(function (el,i) {
    if (el.hours < 10) {
      el = '0' + el.hours;
    } else {
      el = el.hours + '';
    }
    return el;
  });
  return visitTimes;
}