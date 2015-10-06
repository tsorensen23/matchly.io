var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;
//React.render(
  //<Typeahead
    //options={['John', 'Paul', 'George', 'Ringo']}
    //maxVisible={2}
  ///>
//);


var SchoolPicker = React.createClass({
  getInitialState: function() {
  return {schools: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: 'https://sheetsu.com/apis/9e9f4f71',
      type: 'get',
      dataType: 'json',
      complete: function(jqXHR, textStatus) {
        console.log('ajax call finished');
        // callback
      },
      success: function(data, textStatus, jqXHR) {
        //console.log(data.result);
        var schools = data.result.map(function(school) {
          return school.schoolName;
        });

        this.setState({schools: schools});
      }.bind(this),
      error: function (jqXHR, textStatus, errorThrown) {
        console.warn('Htere was an error', errorThrown);
      }
    });
  },

  render: function() {
    console.log(this.state.schools);
    var output = [];
    for (var name in this.props.possible) {
      if (!this.props.possible[name]) {
        output.push(
            <div key={name} >
              {name}
              <Typeahead 
                options={this.state.schools} 
                maxVisible={10}
              />
            </div>
            );
      }
    }
    return (
        <div>
          {output}
        </div>
        );

  }
})

module.exports = SchoolPicker;
