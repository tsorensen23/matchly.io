var mongoose = require('mongoose');
var Schema = mongoos.Schma;
var User = require('./User');

var GroupSchema = Schema({
  admin:{
    type: [Schema.Types.ObjectId],
    ref: 'User',
    index:true,
    required: true
  },
  name: {type:String, required:true},
  code: {type:String, required:true}
});


GroupSchema.methods.requestAccess = function(user){
  User.findOneById()
};

module.exports = mongoose.model('Group', GroupSchema);
