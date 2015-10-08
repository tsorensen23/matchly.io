var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;

var NoValuePicker = require('./noValue.jsx');
var MultipleValuePicker = require('./multipleValues.jsx');
var HasValue = require('./hasValue.jsx');

var SchoolPicker = React.createClass({
  render: function() {
    var output = [];
    var possible = this.props.possible;
    var individuals = this.props.individuals;

    var possHandler = this.props.possibleHandler;
    var resetHandler = this.props.store.resetSchool.bind(this.props.store);
    var schools = this.props.store.availableSchools;
    var finished = this.props.store.finishFuzzy.bind(this.props.store);

    var valued = [];

    var needUpdate = Object.keys(possible).filter(function(name) {
      if (!possible[name]) return true;
      if (Array.isArray(possible[name])) return true;
      console.log('finished');
      valued.push(name);
      return false;
    });

    return (
      <div>
        <div>
          <button onClick={finished} >Schools are Finished</button>
        </div>
        <div style={{display:'inline-block', verticalAlign:'top'}} >{
          needUpdate.map(function(name) {
            if (!possible[name]) {
              return <NoValuePicker
                possibleHandler={possHandler}
                schools={schools}
                person={individuals[name]}
                name={name} key={name}
              />;
            }

            if (Array.isArray(possible[name])) {
              return <MultipleValuePicker
                possibleHandler={possHandler}
                schools={possible[name]}
                person={individuals[name]}
                name={name} key={name}
              />;
            }
          })
        }</div>
        <div style={{display:'inline-block', verticalAlign:'top'}} >{
          valued.map(function(name) {
            console.log(name);
            return <HasValue
                possibleHandler={resetHandler}
                school={possible[name]}
                name={name} key={name}
              />;
          })
        }</div>
      </div>
    );

  }
});

module.exports = SchoolPicker;
