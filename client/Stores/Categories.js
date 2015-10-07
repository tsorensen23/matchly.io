var DataParser = require('../workArea/DataParser.jsx');

function loadOut(type,url,requestedHeaders,parser){
  this.type = type;
  this.url = url;
  this.requested = requestedHeaders;
  this.parser = parse;
};


module.exports = {
  'visitor': new loadOut('visitor','/submitvisitors',[
    'Military',
    'Country',
    'Citizenship',
    'Undergrad',
    'Employer',
    'Industry',
    'City',
    'State',
    'First',
    'Last',
    'Gender',
    'Class Visit Time'
  ],DataParser.parseDataVisitor);
};