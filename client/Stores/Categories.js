var DataParser = require('../workArea/DataParser.jsx');

function LoadOut(type, url, requestedHeaders, realHeaders, parser) {
  this.type = type;
  this.url = url;
  this.requested = requestedHeaders;
  this.realHeaders = realHeaders;
  this.parser = parser;
};

module.exports = {
  visitor: new LoadOut('visitor', '/submitvisitors', [
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
  ], [
    'Contact.First',
    'Contact.Last',
    'MatchInfo.Class Visit Time',
    'Characteristics.Military',
    'Characteristics.Country',
    'Characteristics.Citizenship',
    'Characteristics.Undergrad',
    'Characteristics.Employer',
    'Characteristics.Industry',
    'Characteristics.City',
    'Characteristics.State'
  ], DataParser.parseDataVisitor),
  host: new LoadOut('host', '/submithosts', [
    'First',
    'Last',
    'Email',
    'Section',
    'Military',
    'Country',
    'Citizenship',
    'Undergrad',
    'Employer',
    'Industry',
    'City',
    'State'
  ], [
    'Contact.First',
    'Contact.Last',
    'Contact.Email',
    'Section',
    'Characteristics.Military',
    'Characteristics.Country',
    'Characteristics.Citizenship',
    'Characteristics.Undergrad',
    'Characteristics.Employer',
    'Characteristics.Industry',
    'Characteristics.City',
    'Characteristics.State'
  ], DataParser.parseDataHost)
};
