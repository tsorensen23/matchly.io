var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;

var NoValuePicker = require('./noValue.jsx');
var MultipleValuePicker = require('./multipleValues.jsx');
var HasValue = require('./hasValue.jsx');

var EmployerPicker = React.createClass({
  render: function() {
    var output = [];
    var possible = this.props.possible;
    var individuals = this.props.individuals;

    var possHandler = this.props.possibleHandler;
    var resetHandler = this.props.store.resetEmployer.bind(this.props.store);
    var schools = this.props.store.availableEmployers;
    var finished = this.props.store.finishFuzzyEmployers.bind(this.props.store);

    var valued = [];

    var needUpdate = Object.keys(possible).filter(function(name) {
      if (!possible[name]) return true;
      if (Array.isArray(possible[name])) return true;
      valued.push(name);
      return false;
    });

    return (
      <div style={{"marginTop": "20"}}>
        <div className="row">
          <div style={{"width": "200", "margin": "0 auto"}}>
            <button style={{"fontSize": "1.2em"}}  className="btn btn-success" onClick={finished} >Employees are Finished</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" style={{display:'inline-block', verticalAlign:'top'}} >{
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
          }
        </div>
        <div className="col-md-8">
          <table className="table table-condensed" style={{display:'inline-block', verticalAlign:'top'}} >
            <tbody>
            {
              valued.map(function(name) {
                return <HasValue
                    possibleHandler={resetHandler}
                    school={possible[name]}
                    name={name} key={name}
                  />;
              })
            }
        </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  }
});

module.exports = EmployerPicker;
