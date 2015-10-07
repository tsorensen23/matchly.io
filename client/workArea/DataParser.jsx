var DataParser = {

  parseDataHost: function(dataObject) {
    var dataArray = dataObject.data;
    var modifiedDataArray = [];
    function Individual(military, country, citizenship, undergrad, employer, industry, city, state, first, last, gender, email, section) {
      this.Characteristics = {
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
      this.Contact = {
        First: first,
        Last: last,
        Email: email
      };
      this.MatchInfo = {
        Section: section
      };
    }

    //working on modifying the schema;
    for (var i = 0; i < dataArray.length; i++) {
      var data = new Individual(
        dataArray[i].Veteran,
        dataArray[i].Country,
        dataArray[i].Citizenship,
        dataArray[i]['School UG Name'],
        dataArray[i].Employer,
        dataArray[i]['Employment Industry'],
        dataArray[i].City,
        dataArray[i].State,
        dataArray[i].Preferred,
        dataArray[i].Last,
        dataArray[i].Sex,
        dataArray[i].Email,
        dataArray[i].Section
        );

      modifiedDataArray.push(data);
    }

    modifiedDataArray.forEach(function(object) {
      if (object.Characteristics.Gender === 'F') {
        object.Characteristics.Gender = 'Female';
      } else {
        object.Characteristics.Gender = 'Male';
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

  parseDataVisitor: function(dataObject, map) {
    var dataArray = dataObject;
    var modifiedDataArray = [];
    function Individual(obj) {
      var classVisitNumber;
      classVisitTime = obj[fields['Class Visit Time']].trim();
      classVisitTime = classVisitTime.replace(/\./g, '');
      classVisitTime = classVisitTime.toUpperCase();

      // TODO factor this into a helper function
      if (classVisitTime === '8:00' ||
        classVisitTime === '8:00 AM' ||
        classVisitTime === '08:00 AM' ||
        classVisitTime === '8:00:00 AM' ||
        classVisitTime === '800' ||
        classVisitTime === '800 AM') {
        classVisitNumber = '1';
        classVisitTime = 800;
      } else if (classVisitTime === '10:00' ||
        classVisitTime === '10:00 AM' ||
        classVisitTime === '10:00:00 AM' ||
        classVisitTime === '1000' ||
        classVisitTime === '1000 AM') {
        classVisitTime = 1000;
        classVisitNumber = '2';
      } else if (classVisitTime === '11:45' ||
        classVisitTime === '11:45 AM' ||
        classVisitTime === '11:45:00 AM' ||
        classVisitTime === '11045' ||
        classVisitTime === '1145AM') {
        classVisitNumber = '3';
        classVisitTime = 1145;
      } else {
        console.log('classVisitTime ', classVisitTime);
        console.warn('classvisitTime freakout');
      }

      this.Characteristics = {
        Military: obj[fields.Military],
        Country: obj[fields.Country],
        Citizenship: obj[fields.Citizenship],
        Undergrad: obj[fields.Undergrad],
        Employer: obj[fields.Employer],
        Industry: obj[fields.Industry],
        City: obj[fields.City],
        State: obj[fields.State],
        Gender: obj[fields.Gender]
      };
      this.Contact = {
        First: obj[fields.First],
        Last: obj[fields.Last],
        Email: null
      };
      this.MatchInfo = {
        'Class Visit Time': classVisitTime,
        classVisitNumber: classVisitNumber,
        matchScore: -1,
        matchIndex: null,
        matchedOn: null,
        matchCount: 0
      };
    }

    return dataArray.map(function(obj) {
      return new Individual(dataArray[i]);
    });
  }
};

module.exports = DataParser;
