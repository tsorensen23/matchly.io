var DataParser = {

parseDataHost: function(dataObject){
    var dataArray = dataObject.data;
    var modifiedDataArray = [];
    function Individual(military, country, citizenship, undergrad, employer, industry, city, state, first, last, gender, email, section) {
      this.Characteristics={
        Military: military,
        Country: country,
        Citizenship: citizenship,
        Undergrad: undergrad,
        Employer: employer,
        Industry: industry,
        City: city,
        State: state,
        Gender: gender,
      };
      this.Contact={
        First: first,
        Last: last,
        Email: email
      };
      this.MatchInfo= {
        Section: section,
        1: {
          matchIndex:null,
          matchScore:-1
        },
        2: {
          matchIndex:null,
          matchScore:-1
        },
        3: {
          matchIndex:null,
          matchScore:-1
        }
      };
      
    }
//working on modifying the schema;

    for(var i=0; i<dataArray.length; i++) {
      var data = new Individual(
        dataArray[i]['Veteran'],
        dataArray[i]['Country'],
        dataArray[i]['Citizenship'],
        dataArray[i]['School UG Name'],
        dataArray[i]['Employer'],
        dataArray[i]['Employment Industry'],
        dataArray[i]['City'],
        dataArray[i]['State'],
        dataArray[i]['Preferred'],
        dataArray[i]['Last'],
        dataArray[i]['Sex'],
        dataArray[i]['Email'],
        dataArray[i]['Section']
        );

      modifiedDataArray.push(data);
    }
    modifiedDataArray.forEach(function(object){
      if(object.Characteristics.Gender==='F') {
        object.Characteristics.Gender='Female';
      } else {
        object.Characteristics.Gender='Male';
      }
      // if(object.Characteristics.Military==='None') {
      //   object.Characteristics.Military=0;
      // } 
      // for(var key in object) {
      //   if(object[key][0]==="") {
      //     object[key][1]=0;
      //   }
      // }
    });
    return modifiedDataArray;
  },

  parseDataVisitor: function(dataObject, fields) {
    var dataArray = dataObject.data;
    console.log('fields', fields);
    var modifiedDataArray = [];
    function Individual(military, country, citizenship, undergrad, employer, industry, city, state, first, last, gender, ClassVisitTime) {
      if(ClassVisitTime==='8:00 AM'){
      classVisitNumber=1;
    } else if(ClassVisitTime ==='10:00 AM'){
      classVisitNumber=2;
    } else if(ClassVisitTime==='11:45 AM'){
      classVisitNumber=3;
    } 
      this.Characteristics={
        Military: military,
        Country: country,
        Citizenship: citizenship,
        Undergrad: undergrad,
        Employer: employer,
        Industry: industry,
        City: city,
        State: state,
        Gender: gender
      };
      this.Contact={
        First: first,
        Last: last,
        Email: null
      };
      this.MatchInfo={
        'Class Visit Time': ClassVisitTime,
        classVisitNumber: classVisitNumber,
        matchScore:-1,
        matchIndex:null,
        matchedOn:null,
        matchCount:0
      };
    }
   
    for(var i=0; i<dataArray.length; i++) {
      var milStatusKey = fields[0];
      var CountryKey=fields[1];
      var CitizenshipKey=fields[2];
      var UndergraduateKey=fields[3];
      var EmployerKey=fields[4];
      var IndustryKey=fields[5];
      var CityKey=fields[6];
      var StateKey=fields[7];
      var FirstKey=fields[8];
      var LastKey=fields[9];
      var GenderKey=fields[10];
      var ClassVisitTimeKey=fields[11];
      var data = new Individual(
        dataArray[i][milStatusKey],
        dataArray[i][CountryKey],
        dataArray[i][CitizenshipKey],
        dataArray[i][UndergraduateKey],
        dataArray[i][EmployerKey],
        dataArray[i][IndustryKey],
        dataArray[i][CityKey],
        dataArray[i][StateKey],
        dataArray[i][FirstKey],
        dataArray[i][LastKey],
        dataArray[i][GenderKey],
        dataArray[i][ClassVisitTimeKey]
        );
      console.log(data);
      modifiedDataArray.push(data);
    }
    return modifiedDataArray;
  },
};

module.exports=DataParser;