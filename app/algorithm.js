//THIS IS NOT USED

var Rumble = {

  scoreCalc: function(visitor, host) {
    var score=0;
    for(var key in visitor.characteristics) {
      if(visitor.characteristics[key] === host.characteristics[key]) {
        score++;
      }
    }
    return score;
  },

  populateClassNumber:function(time){
    if(time==='9:00 AM'){
      time=1;
    } else if(time ==='10:30 AM'){
      time=2;
    } else if(time==='11:45 AM'){
      time=3;
    } else {
      time=3;
    }
    console.log('timeChanger fires');
    return time;
  },

  findTotalScore: function(group1) {
    var score=0;
    for(var i = 0; i<group1.length; i++) {
      score = score + group1[i].matchScore;
    }
    return score;
  },

  checkSectionScore: function(visitor, host, constraintObject, currentScore) {
    var sectionKey = host.MatchInfo.section+visitor.MatchInfo.classVisitNumber.toString();
    console.log(sectionKey);
    if(currentScore > constraintObject[sectionKey].lowestScore){
      return true;
    } else {
      return false;
    }
  },

  determineVisitorHostClassNumberVariable: function(visitor) {
    var hostKey;
    var number = visitor.MatchInfo.classVisitNumber;
    if(number===1){
      hostKey='firstClass';
    } else if (number===2) {
      hostKey='secondClass';
    } else if(number===3) {
      hostKey='thirdClass';
    }
    return hostKey;
  },

  rumble: function(visitorArray, hostArray, constraintObject) {
    //this adds the classVisitNumber
    for(var j=0;j<visitorArray.length;j++) {
      visitorArray[j].MatchInfo.classVisitNumber=
      this.populateClassNumber(visitorArray[j].MatchInfo.classVisitTime);
    }
    var bool = true;
    while(bool) {
      bool=false;
      for(var i = 0; i<visitorArray.length; i++) {
        if(visitorArray[i].MatchInfo.matchIndex === null) {
          bool=true;
          var bestMatchIndex;
          var bestMatchScore = -1;
          var currentBestMatchScore;
          //this will look like A1, E2, etc
          var sectionKey;
          //this will look like "firstClass", 'secondClass', etc
          var classVisitNumberKey=this.determineVisitorHostClassNumberVariable(visitorArray[i]);
         
          for(var ii = 0; ii < hostArray.length; ii++) {
            //calculate the matchScore between the current visitor and the current host
            currentBestMatchScore = scoreCalc(visitorArray[i], hostArray[ii]);
            //if the match score is higher than the best match score and the host's existing matchscore and the section's lowest matchscore, them save as best match
            if(currentBestMatchScore > bestMatchScore && 
              currentBestMatchScore > hostArray[ii].MatchInfo[classVisitNumberKey].matchScore &&
              checkSectionScore(visitorArray[i],hostArray[ii],constraintObject,currentBestMatchScore)===true) {
              bestMatchScore = currentBestMatchScore;
              bestMatchIndex = ii;
              var section=hostArray[ii].MatchInfo.section;
              var sectionNumber=visitorArray[i].MatchInfo.classVisitNumber.toString();
              sectionKey=section+sectionNumber;
            }
          }
          //if there are available spots in the class
          if(constraintObject[sectionKey].availableSpots>0){
            if(hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchIndex === null) {
              //set host match
              hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchScore=bestMatchScore;
              //set visitor match
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestMatchScore;
              //set section match info
              constraintObject[sectionKey].matches[hostArray[bestMatchIndex].Contact.Email]={
                hostIndex:{
                    indexNumber:bestMatchIndex,
                    classString: sectionKey
                },
                visitorIndex:i,
                matchScore:bestMatchScore
                };
              delete constraintObject[sectionKey].matches.exists;
              //check if we are the worst match pair in the section
              if(bestMatchScore<constraintObject[sectionKey].lowestScore){
                constraintObject[sectionKey].lowestScore=bestMatchScore;
                constraintObject[sectionKey].lowestIndex=hostArray[bestMatchIndex].Contact.Email;
              }
              
              constraintObject[sectionKey].availableSpots--;
            } else {
                    //get the index for the old visitor
                    oldMatchIndex=hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchIndex;
                    //assign the new visitor to the host and host to the visitor
                    hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchIndex=i;
                    hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchScore=bestMatchIndex;
                    visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
                    visitorArray[i].MatchInfo.matchScore=bestMatchScore;
                    //assign new match index and score in ConstraintObject
                    constraintObject[sectionKey].matches[hostArray[bestMatchIndex].Contact.Email].visitorIndex=i;
                    constraintObject[sectionKey].matches[hostArray[bestMatchIndex].Contact.Email].matchScore=bestMatchScore;

                    //determine who is new low score
                    var matchesObject=constraintObject[sectionKey].matches;
                    var newLowScore=100000000;
                    var newLowIndex;
                    for (var key in matchesObject) {
                      if(matchesObject[key].matchScore<newLowScore){
                        newLowScore=matchesObject[key].matchScore;
                        newLowIndex=key;
                      }

                    }
                    //assign new low score and index
                    constraintObject[sectionKey].lowestScore=newLowScore;
                    constraintObject[sectionKey].lowestIndex=newLowIndex;

                    //I am here, i need to clear out the old visitor
                    //clear old visitor match
                    visitorArray[oldMatchIndex].MatchInfo.matchIndex=null;
                    visitorArray[oldMatchIndex].MatchInfo.matchScore=-1;
                    
                  } 
          } else {
                if(hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchIndex === null) {
                  //find worst match in the section we're going to be matching in and unmatch them
                  var worstMatchPair = constraintObject[sectionKey].lowestIndex;
                  var worstMatchHost = constraintObject[sectionKey][worstMatchPair].hostIndex;
                  var worstMatchVisitor = constraintObject[sectionKey].worstMatchPair.visitorIndex;

                  //clear out worst pair match
                  hostArray[worstMatchHost.hostIndex.indexNumber].MatchInfo[worstMatchHost.hostIndex.classString].matchIndex=null;
                  hostArray[worstMatchHost.hostIndex.indexNumber].MatchInfo[worstMatchHost.hostIndex.classString].matchScore=-1;
                  visitorArray[worstMatchVisitor].MatchInfo.matchIndex=null;
                  visitorArray[worstMatchVisitor].MatchInfo.matchScore=-1;
                  //set host match
                  hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchIndex=i;
                  hostArray[bestMatchIndex].MatchInfo[classVisitNumberKey].matchScore=bestMatchScore;
                  //set visitor match
                  visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
                  visitorArray[i].MatchInfo.matchScore=bestMatchScore;
                  //set section match info
                  constraintObject[sectionKey].matches[constraintObject[sectionKey].availableSpots.toString()]={
                    hostIndex:bestMatchIndex,
                    visitorIndex:i,
                    matchScore:bestMatchScore
                  };
                }
              }
        }
      }
    }
  }
};



module.exports=Rumble;



