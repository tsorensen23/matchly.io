var DataParser = {

parseDataHost: function(dataObject){
    var dataArray = dataObject.data;
    var modifiedDataArray = [];
    function individual(military, country, citizenship, undergrad, employer, industry, city, state, first, last, gender, email, section) {
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
      var data = new individual(
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
    console.log('modifiedDataArray', modifiedDataArray);
    return modifiedDataArray;
  },

  parseDataVisitor: function(dataObject) {
    // console.log('parseDataVisitors');
    // console.log('data in parseDataVisitor', dataObject);
    var dataArray = dataObject.data;
    console.log(dataArray);

    // console.log(dataArray,'dataArray');
    var modifiedDataArray = [];
    // console.log(dataArray, 'dataArray');
    function individual(military, country, citizenship, undergrad, employer, industry, city, state, first, last, gender, ClassVisitTime) {
      console.log('ClassVisitTime', ClassVisitTime);
      if(ClassVisitTime==='8:00 AM'){
        console.log('8 am fires');
      ClassVisitTime=1;
    } else if(ClassVisitTime ==='10:00 AM'){
      console.log('10 am fires');
      ClassVisitTime=2;
    } else if(ClassVisitTime==='11:45 AM'){
      console.log('11:45 fires');
      ClassVisitTime=3;
    } 
    console.log('ClassVisitTime after parse', ClassVisitTime);
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
        classVisitTime: ClassVisitTime,
        matchScore:-1,
        matchIndex:null,
        matchedOn:null,
        matchCount:0
      };
    }
    for(var i=0; i<dataArray.length; i++) {
      var data = new individual(
        dataArray[i]['Military Status'],
        dataArray[i]['Address Country'],
        dataArray[i]['CITIZENSHIP1'],
        dataArray[i]['Undergraduate Institution'],
        dataArray[i]['Employer'],
        dataArray[i]['Industry'],
        dataArray[i]['Address City'],
        dataArray[i]['Address Region'],
        dataArray[i]['First'],
        dataArray[i]['Last'],
        dataArray[i]['Gender'],
        dataArray[i]['Class Visit Time']
        );
      modifiedDataArray.push(data);
      // console.log(modifiedDataArray,'modifiedDataArray');
    }
    return modifiedDataArray;
  },
};

module.exports=DataParser;