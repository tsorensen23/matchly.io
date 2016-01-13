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
  if (twoSlot) {
    return ['09', '11'];
  }
  else {
    return ['08', '10', '11'];
  }

  return visitTimes;
};