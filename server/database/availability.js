var Match = require('./../../matchingAlgorithm/Match.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tempObject = {};
['A','B','C','D','E'].forEach(function(letter) {
  for(var number=1;number<4;number++){
    tempObject[letter+number]={
      availableSpots: {type: Number},
      lowestScore: {type: Number},
      lowestIndex: {type: String},
      matches: [Match.Schema]

    };
  }
});

var availabilitySchema = new Schema(tempObject,{toObject:true});

availabilitySchema.set('toObject', { getters: true });
availabilitySchema.method('getTotalAvailableOf',function(number) {
 
});



module.exports = mongoose.model('availability', availabilitySchema);

