var clone = require('clone');

var Rumble = {
  calculatematchScore: function(visitor, host) {
    // console.log(visitor);
    // console.log(host);
    // Military
    // Country
    // Citizenship
    // Gender
    // Undergrad
    // Employer/Industry
    // City/State
    // Career interest/future industry
    var count=0;
    var score=0;
    var matchedOn ={
      Gender:false,
      State:false,
      City:false,
      Industry:false,
      Employer:false,
      Undergrad:false,
      Citizenship:false,
      Country:false,
      Military:false
    };
    // console.log(visitor.Characteristics['State'],'visitor State');
    // console.log(host.Characteristics['State'], 'host State');
    if(visitor.Characteristics['Gender'] === host.Characteristics['Gender']) {
        // console.log('Gender fires');
        score=score+100000;
        count++;
        matchedOn.Gender=true;
    }
    if(visitor.Characteristics['State'] === host.Characteristics['State']) {
        // console.log('State fires');
        score=score+1;
        count++;
        matchedOn.State=true;
    }
    if(visitor.Characteristics['City'] === host.Characteristics['City']) {
        // console.log('City fires');
        score=score+10;
        count++;
        matchedOn.City=true;
    }    
    if(visitor.Characteristics['Industry'] === host.Characteristics['Industry']) {
        // console.log('Industry fires');
        score=score+100;
        count++;
        matchedOn.Industry=true;
    }
    if(visitor.Characteristics['Employer'] === host.Characteristics['Employer']) {
        // console.log('Employer fires');
        score=score+1000;
        count++;
        matchedOn.Employer=true;
    }
    if(visitor.Characteristics['Undergrad'] === host.Characteristics['Undergrad']) {
        // console.log('Undergrad fires');
        score=score+10000;
        count++;
        matchedOn.Undergrad=true;
    }if(visitor.Characteristics['Citizenship'] === host.Characteristics['Citizenship']) {
        // console.log('Citizenship fires');
        score=score+1000000;
        count++;
        matchedOn.Citizenship=true;
    }
    if(visitor.Characteristics['Country'] === host.Characteristics['Country']) {
        // console.log('Country fires');
        score=score+10000000;
        count++;
        matchedOn.Country=true;
    }
    if(visitor.Characteristics['Military'] === host.Characteristics['Military']) {
        // console.log('Military fires');
        score=score+100000000;
        count++;
        matchedOn.Military=true;
    }
    // console.log(score, 'this is the score');
    // console.log('host',host.Characteristics,'visitor',visitor.Characteristics,'score',score);
    var returnObject={
      score:score,
      count:count,
      matchedOn:matchedOn
    };
    return returnObject;
  },

  determineQuadrant: function(visitor,host,constraintObject) {
    var hostMatched;
    var classFull;
    var section=host.MatchInfo.Section;
    var classVisitTime=visitor.MatchInfo.classVisitTime.toString();
    var sectionVisit=section+classVisitTime;
    if(host.MatchInfo[classVisitTime].matchIndex===null) {
      hostMatched='notMatched';
    } else {
      hostMatched='matched';
    }
    if(constraintObject[sectionVisit].availableSpots>0){
      classFull='NotFull';
    } else {
      classFull='Full';
    }
    var situation=hostMatched+classFull;
    return situation;
  },
  SpecificClass:function(visitor, host) {
    // console.log(host);
    var section = host.MatchInfo.Section;
    var sectionNumber = visitor.MatchInfo.classVisitTime;
    var specificClass=section+sectionNumber;
    return specificClass;

  },
  ClassAvailable:function(constraintObject, specificClass,score) {
    // console.log('ClassAvailable', constraintObject);
    // console.log(specificClass,'specificClass');
    // console.log('ClassAvailable',constraintObject[specificClass],score);
    if(constraintObject[specificClass].availableSpots>0 || score > constraintObject[specificClass].lowestScore ){
      return true;
    }
    return false;
  },


  visitorHostParings: function(visitorArray,hostArray) {
    function Match(visitorFirstName,visitorLastName, hostFirstName, hostLastName, hostEmail, section, visitTime, matchScore,matchCount,Citizenship,City,Employer,Gender,Industry,Military,State,Undergrad,Country) {
      this.visitorName=visitorFirstName+" "+visitorLastName;
      this.hostName=hostFirstName+" "+hostLastName;
      this.hostEmail=hostEmail;
      this.section=section;
      this.visitTime=visitTime;
      this.sectionTime=section+visitTime.toString();
      this.matchScore=matchScore;
      this.matchCount=matchCount;
      this.Citizenship=Citizenship;
      this.City=City;
      this.Employer=Employer;
      this.Gender=Gender;
      this.Industry=Industry;
      this.Military=Military;
      this.State=State;
      this.Undergrad=Undergrad;
      this.Country=Country;
    }
    var matches = visitorArray.map(function(visitor){
      var host=hostArray[visitor.MatchInfo.matchIndex];
      // console.log(visitor, 'visitor');
      var m = new Match(visitor.Contact.First,visitor.Contact.Last,host.Contact.First,host.Contact.Last,host.Contact.Email,host.MatchInfo.Section,visitor.MatchInfo.classVisitTime,visitor.MatchInfo.matchScore,visitor.MatchInfo.matchCount,visitor.MatchInfo.matchedOn.Citizenship,visitor.MatchInfo.matchedOn.City,visitor.MatchInfo.matchedOn.Employer,visitor.MatchInfo.matchedOn.Gender,visitor.MatchInfo.matchedOn.Industry,visitor.MatchInfo.matchedOn.Military,visitor.MatchInfo.matchedOn.State,visitor.MatchInfo.matchedOn.Undergrad,visitor.MatchInfo.matchedOn.Country);
      return m;
    });

    matches.unshift(new Match('Visitor ', '','Host ','','Host Email', 'Section','Lecture','Match Score','matchCount','Citizenship','city','Employer','Gender','Industry','Military','State','Undergrad','Country'));
    
    return matches;
  },
  SectionCapacity:function(constraintObject) {
    var sections=['A','B','C','D','E'];
    var capacity=[];
    for(var l=0;l<sections.length;l++) {
      for(var m=1;m<4;m++) {
        var section=sections[l]+m.toString();
        // console.log(section,'section');
        capacity.push([constraintObject[section].availableSpots,section]);
      }
    }
    return capacity;
  },
  SortReturnObject: function(returnObject) {
    // console.log(returnObject,'returnObject');
    returnObject=returnObject.sort(function(a,b){
      // console.log(a.sectionTime,'a section time');
      // console.log(b.sectionTime,'b section time');
      return a.sectionTime-b.sectionTime;
    });
    return returnObject;
  },

  SectionReport:function(constraintObject,originalCapacity) {
    //this is not working it is giving incorrect numbers for visitors
    var sections=['A','B','C','D','E'];
    var classVisitorNumbers=[];
    for(var l=0;l<sections.length;l++) {
      for(var m=1;m<4;m++) {
        var section=sections[l]+m.toString();
        // console.log(originalCapacity);
        var numberOfVisitors=originalCapacity[l][0] - constraintObject[section].availableSpots;
        // console.log(numberOfVisitors);
        classVisitorNumbers.push(numberOfVisitors);
        //need to know how many stdudent we could have had
      }
    }
    return classVisitorNumbers;
  },
  
  rumble: function(visitorArray, hostArray, constraintObject) {
    var notMatchedFullCount=0;
    // console.log('first', visitorArray);
    // console.log('visitor host',visitorArray.length, hostArray.length);
    visitorArray=visitorArray.sort(function(a,b){
      return a.Contact.First - b.Contact.First;
    });
    // console.log('second', visitorArray);

    constraintObject=constraintObject[0];
    var bool = true;
    var whileCount=0;
    var originalCapacity=this.SectionCapacity(constraintObject);
    // console.log(originalCapacity,'originalCapacity');

    while(bool) {
      var bestmatchScore=-1;
      var bestMatchIndex;
      var bestCount;
      var bestMatchedOn;
      whileCount++;
      // console.log('whileCount ', whileCount);
      bool=false;
      
      for(var i = 0; i<visitorArray.length; i++) {
        var unmatched=0;
        var availableSpots=0;
        for(var j=0;j<visitorArray.length;j++) {
        if(visitorArray[j].MatchInfo.matchIndex === null) {
          unmatched++;
        }
      }
      availableSpots=availableSpots+constraintObject.A3.availableSpots;
      availableSpots=availableSpots+constraintObject.B3.availableSpots;
      availableSpots=availableSpots+constraintObject.C3.availableSpots;
      availableSpots=availableSpots+constraintObject.D3.availableSpots;
      availableSpots=availableSpots+constraintObject.E3.availableSpots;
      availableSpots=availableSpots+constraintObject.A2.availableSpots;
      availableSpots=availableSpots+constraintObject.B2.availableSpots;
      availableSpots=availableSpots+constraintObject.C2.availableSpots;
      availableSpots=availableSpots+constraintObject.D2.availableSpots;
      availableSpots=availableSpots+constraintObject.E2.availableSpots;
      availableSpots=availableSpots+constraintObject.A1.availableSpots;
      availableSpots=availableSpots+constraintObject.B1.availableSpots;
      availableSpots=availableSpots+constraintObject.C1.availableSpots;
      availableSpots=availableSpots+constraintObject.D1.availableSpots;
      availableSpots=availableSpots+constraintObject.E1.availableSpots;
      
      // console.log('unmatched ', unmatched, ' availableSpots ',availableSpots);
        if(visitorArray[i].MatchInfo.matchIndex === null) {
          bool = true;
          bestmatchScore=-1;
          bestMatchIndex=null;
          bestCount=null;
          bestMatchedOn=null;
          var classNumber=visitorArray[i].MatchInfo.classVisitTime;
          console.log(bestMatchIndex, 'bestMatchIndex after if');
          var counterif=0;
          var found = false;
          // console.log(hostArray.length, 'our host array length');
          for(var k =0; k<hostArray.length; k++) {
            var currentMatchObject=this.calculatematchScore(visitorArray[i],hostArray[k]);
            // console.log(currentMatchObject,'currentMatchObject');
            var currentScore=currentMatchObject.score;
            // console.log('current score of match', currentScore);
            var currentCount=currentMatchObject.count;
            var currentMatchedOn=currentMatchObject.matchedOn;
            // console.log(currentMatchedOn,'matchedon');
            // console.log(currentScore,'currentScore');
            var hostCurrentScore=hostArray[k].MatchInfo;
            //constraint determining if visitor choose current host as best match
            //is the current host a better match than your existing best match
            //is the current visitor a better match than the current hosts existing match
            //is the specific class not full or is the potential match better than the worst match in the specific class
            var hostCurrentmatchScore=hostArray[k].MatchInfo[classNumber].matchScore;
            
            var hostClass=this.SpecificClass(visitorArray[i],hostArray[k]);
            // console.log(hostClass,'hostClass');
            // console.log('host: ', hostArray[k]);
            // console.log('visitor', visitorArray[i]);
            var classAvailable=this.ClassAvailable(constraintObject,hostClass,currentScore);
            // console.log('visitor', i,'host',k,'host existing score',hostCurrentmatchScore, 'currentScore',currentScore,'bestscore',bestmatchScore,'bestmatch', bestMatchIndex,classAvailable,'classAvailable');

            // console.log('if conditions', currentScore>bestmatchScore , currentScore>hostCurrentmatchScore ,  classAvailable===true);
            // console.log('visitor before',visitorArray[i]);
            if (currentScore>bestmatchScore && currentScore>hostCurrentmatchScore &&  classAvailable===true) {
              counterif++;
              // console.log("visitor",visitorArray[i]);
              // console.log('host',hostArray[k]);
              // console.log('if statement fires');
              found = true;
              // console.log('if fires',counterif);
              bestmatchScore=currentScore;
              bestMatchIndex=k;
              bestCount=currentCount;
              bestMatchedOn=currentMatchedOn;
              // console.log(bestMatchedOn,'bestMatchedOn populated');
            }//closes currentScore>bestmatchScore
          }//closes var j =0; j<hostArray.length; j++
          var visitor=visitorArray[i];
          var host=hostArray[bestMatchIndex]; 
          //determineQuadrant determines which quadrant we are in for assigning matches
          //this looks like 'firstClass'
          // console.log("foundcount and isfound: ",found, counterif);
          // console.log("bestMatchIndex: ",bestMatchIndex);
          var specificClass = this.SpecificClass(visitorArray[i],hostArray[bestMatchIndex]);
          var hostEmail=hostArray[bestMatchIndex].Contact.Email;
          var quadrant=this.determineQuadrant(visitor, host, constraintObject);
          // console.log(quadrant,"this is the quadrant");
          // console.log(bestMatchIndex,'before swithc');
          switch (quadrant) {
            case "matchedFull":
            // console.log('matchedFull fires', 'host',bestMatchIndex,'visitor',i);
              //pick up old match info
              var originalMatchIndex=hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex;
              // console.log(originalMatchIndex,'originalMatchIndex');
              //unmatch original Match
              // console.log(bestMatchedOn,'matchedfull');
              visitorArray[originalMatchIndex].MatchInfo.matchIndex=null;
              visitorArray[originalMatchIndex].MatchInfo.matchScore=-1;
              //assign host to new visitor
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestmatchScore;
              visitorArray[i].MatchInfo.matchCount=bestCount;
              visitorArray[i].MatchInfo.matchedOn=bestMatchedOn;
              // console.log(bestMatchedOn,'matchinfoafter');


              //matched on and match count

              //assign new visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestmatchScore;
              //assign both to class
              
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestmatchScore
              };
              //determine lowest score
              var lowestScore=10000000000;
              for(var match in constraintObject[specificClass].matches){

                // console.log(match,'match');
                // console.log(constraintObject[specificClass].matches[match].matchScore,'matchScore');
                if(match.matchScore<lowestScore){
                  lowestScore=match.matchScore;
                  lowestIndex=match;
                
                constraintObject[specificClass].lowestScore=lowestScore;
                constraintObject[specificClass].lowestIndex=lowestIndex;
                }
              }
              // returnObject.push(clone(constraintObject));
              break;
            case "matchedNotFull":
            // console.log('matchedNotFull fires','host',bestMatchIndex,'visitor',i);
              //pickup old match info
              var originalMatchIndex=hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex;
              //unmatch original Match
              visitorArray[originalMatchIndex].MatchInfo.matchIndex=null;
              visitorArray[originalMatchIndex].MatchInfo.matchScore=-1;
              //assign new visitor to host
              // console.log(matchedOn,'matchedOn');
              // console.log(bestMatchedOn,'matchednofull best matched');
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestmatchScore;
              visitorArray[i].MatchInfo.matchCount=bestCount;
              visitorArray[i].MatchInfo.matchedOn=bestMatchedOn;
              // console.log(visitorArray[i].MatchInfo,'matchednotfull');

              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestmatchScore;
              //assign both to class
              var worstmatchScore=constraintObject[specificClass].worstmatchScore;
              if(bestmatchScore<worstmatchScore) {
                constraintObject[specificClass].lowestScore=bestmatchScore;
                constraintObject[specificClass].lowestIndex=hostEmail;
              }
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestmatchScore
              };
              //delete exists
              delete constraintObject[specificClass].matches.exists;
              // returnObject.push(clone(constraintObject));
              break;
            case "notMatchedFull":
              notMatchedFullCount++;
              // console.log('notMatchedFullCount', notMatchedFullCount);
            // console.log("notMatchedFull fires",'host',bestMatchIndex,'visitor',i);
              //run quadrant 3 function
              //find worst match and unmatch
              var classHostEmail=constraintObject[specificClass].lowestIndex;
              // console.log(classHostEmail,'class host email');
              //host index
              // console.log(constraintObject[specificClass],'specificClass right before crash');

              //this doesn't make sense because the host is not matched yet, so it
              // console.log('notmatched constrtaint object',constraintObject[specificClass]);
              var hostIndexTest=bestMatchIndex;
              var hostIndex=constraintObject[specificClass].matches[classHostEmail].hostIndex;
              // console.log(hostIndex,hostIndexTest);
              //host specific class
              var hostClass=constraintObject[specificClass].matches[classHostEmail].hostClass;
              //visitor index
              var visitorIndex=constraintObject[specificClass].matches[classHostEmail].visitorIndex;
              //delete match from contraint object
              delete constraintObject[specificClass].matches[classHostEmail];
              //unmatch host
              hostArray[hostIndex].MatchInfo[hostClass].matchIndex=null;
              hostArray[hostIndex].MatchInfo[hostClass].matchScore=-1;
              //unmatch visitor
              visitorArray[visitorIndex].MatchInfo.matchIndex=null;
              visitorArray[visitorIndex].MatchInfo.matchScore=-1;
              //assign host to visitor
              // console.log(matchedOn,'matchedOn');
              // console.log(bestMatchedOn,'notMatchedFull');
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestmatchScore;
              visitorArray[i].MatchInfo.matchCount=bestCount;
              visitorArray[i].MatchInfo.matchedOn=bestMatchedOn;
              // console.log(visitorArray[i].MatchInfo,'matchinfoafter');

              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestmatchScore;
              //assign both to class
              
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestmatchScore
              };
              //delete exists from object
              delete constraintObject[specificClass].matches.exists;
              //determine lowest index and assign new host to lowest index
              //this needs to be fixed 
              var lowestScore=10000000000;
              for(var match in constraintObject[specificClass].matches){
                // console.log('for loop fires');
                // console.log(constraintObject[specificClass].matches[match],'match');
                if(constraintObject[specificClass].matches[match].matchScore<lowestScore){
                  console.log('if statement firest]');
                  lowestScore=constraintObject[specificClass].matches[match].matchScore;
                  lowestIndex=match;
                
                constraintObject[specificClass].lowestScore=lowestScore;
                constraintObject[specificClass].lowestIndex=lowestIndex;
                }
              }
              // returnObject.push(clone(constraintObject));
              break;
            case "notMatchedNotFull":
              // console.log("notMatchedNotFull fires",'host',bestMatchIndex,'visitor',i);
              //assign host to visitor
              // console.log(matchedOn,'matchedOn');
              // console.log(bestMatchedOn,'notMatchedNotFull');
              var test=clone(bestMatchedOn);
              // console.log('test',test);
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestmatchScore;
              visitorArray[i].MatchInfo.matchCount=bestCount;
              visitorArray[i].MatchInfo.matchedOn=test;
              // console.log(visitorArray[i].MatchInfo,'matchinfoafter');

              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestmatchScore;
              //assign both to class
              // console.log('before if');
              var lowestScore=constraintObject[specificClass].lowestScore;
              if(bestmatchScore<lowestScore){
              // console.log('if fires');
                constraintObject[specificClass].lowestScore=bestmatchScore;
                constraintObject[specificClass].lowestIndex=hostEmail;  
              }
              // console.log('afte if');
              // console.log(hostEmail,'Email');
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestmatchScore
              };
              delete constraintObject[specificClass].matches.exists;
              // console.log(constraintObject[specificClass].matches['rob'],'rob');
              // console.log(constraintObject,'constraintObject immediately after');
              // console.log(constraintObject[specificClass].matches['rob'],'rob');
              constraintObject[specificClass].availableSpots--;
              // returnObject.push(clone(constraintObject));
              //
              break;
          }
          // console.log(constraintObject,'constraintObject');
        }//close visitorArray[i].MatchInfo.matchIndex === null
      }//close first for loop
      // break;
    }//while loop
    // console.log('end of rumble');
    // console.log('visitor host stuff: ',visitorArray);
    var visitorHostParings=this.visitorHostParings(visitorArray,hostArray,constraintObject);
    visitorHostParings=this.SortReturnObject(visitorHostParings);
    var sectionReport=this.SectionReport(constraintObject,originalCapacity);
   //add section report and make it work
   //also fix the sort function!!!!
   // console.log('visitorHostParings',visitorHostParings);
    return visitorHostParings;
  }//close rumble
};

//to do:
//add worst matchScore=-1 and worst match index=null to constraintObject
//add if statement to matching to determin if you are the best match for the host and better than the worst match in the class or is there room
module.exports=Rumble;



