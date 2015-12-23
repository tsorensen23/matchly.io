
var AvailabilityCheck = {

  availabilityCheck: function(visitors, availability) {
  
  var visitorsLecture1 = 0;
  var visitorsLecture2 = 0;
  var visitorsLecture3 = 0;

  var lecture1Spots = 0;
  var lecture2Spots = 0;
  var lecture3Spots = 0;
  
//   console.log(availability);
  lecture1Spots += availability.A1.availableSpots; 
  lecture1Spots += availability.B1.availableSpots;
  lecture1Spots += availability.C1.availableSpots;
  lecture1Spots += availability.D1.availableSpots;
  lecture1Spots += availability.E1.availableSpots;
  
  lecture2Spots += availability.A2.availableSpots; 
  lecture2Spots += availability.B2.availableSpots;
  lecture2Spots += availability.C2.availableSpots;
  lecture2Spots += availability.D2.availableSpots;
  lecture2Spots += availability.E2.availableSpots;
  
  lecture3Spots += availability.A3.availableSpots; 
  lecture3Spots += availability.B3.availableSpots;
  lecture3Spots += availability.C3.availableSpots;
  lecture3Spots += availability.D3.availableSpots;
  lecture3Spots += availability.E3.availableSpots;
  
  for(var i=0; i<visitors.length; i++) {
    if(visitors[i].MatchInfo.classVisitNumber === '1') {
      visitorsLecture1++;
      continue;
    }
    if(visitors[i].MatchInfo.classVisitNumber === '2') {
      visitorsLecture2++;
      continue;
    }
    if(visitors[i].MatchInfo.classVisitNumber === '3') {
      visitorsLecture3++;
      continue;
    }
  }
  var returnObject = {
    lecture1Spots:visitorsLecture1 - lecture1Spots,
    lecture2Spots:visitorsLecture2 - lecture2Spots,
    lecture3Spots:visitorsLecture3 - lecture3Spots,
    status: true
  };

  if(lecture1Spots < visitorsLecture1) {
    returnObject.status = false;
  }
  if(lecture2Spots < visitorsLecture2) {
    returnObject.status = false;    
  }
  if(lecture3Spots < visitorsLecture3) {
      returnObject.status = false;
  }
  return returnObject;
  

}
};

// console.log(AvailabilityCheck(VisitorData, AvailabilityConstraint));

module.exports = AvailabilityCheck;
