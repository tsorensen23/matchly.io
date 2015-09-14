var React = require('react');
var Button = require('./Button.jsx');
var ButtonList = React.createClass({
  getInitialState: function() {
    var colors = ["#389adc", "#e74c3c", "#f1c40f", "#1abc9c", "#9b59b6", "#34495e", "#d35400", "#f39c12", "#16a085" ];
    var fields = this.props.fields.map(function(value){
      return {
        value: value,
        color: null,
        matchIndex: null
      };
    });
    var categories = this.props.categories.map(function(value, i){
      return {
        value: value,
        color: colors[i],
        matchIndex: null
      };
    }.bind(this));
    return ({
      index: null,
      categoriesDisabled: false,
      fieldsDisabled: true,
      fields: fields,
      categories: categories
    });
  },
  // changeColor takes a componenets index
  changeColor: function(buttonIndex) {
    console.log('index',this.state.index);
    if(this.state.index === null) {
      this.setState({index: buttonIndex});
    } else {
      this.reorder(buttonIndex, this.state.index);
    }
    this.toggleDisabled();
    console.log(buttonIndex);
  },
  reorder: function(currIndex, newIndex){
    console.warn('reorder was called');
    var tempFields = this.state.fields;
    var temp = tempFields[currIndex];
    temp.color=this.state.categories[newIndex].color;
    tempFields[currIndex] = tempFields[newIndex];
    tempFields[newIndex] = temp;
    console.dir(this.state.fields);
    this.setState({fields: tempFields,
                  index: null
    });
    console.log('temp', temp);
  },
  toggleDisabled: function() {
    this.setState({
      categoriesDisabled: !this.state.categoriesDisabled,
      fieldsDisabled: !this.state.fieldsDisabled
    });
  },
  render: function() {
    console.log("index at render", this.state.index);
    console.dir(this.state.fields);
    

    var fieldButtons = this.state.fields.map(function(object, index) {
      return (
        <Button
          colorChange={this.changeColor}
          color={object.color}
          disabled={this.state.fieldsDisabled}
          key={index}
          index={index}
          data={object.value} />
        );
    }.bind(this));
    var categoryButtons = this.state.categories.map(function(object, index) {
      return (
        <Button
          colorChange={this.changeColor}
          color={object.color}
          disabled={this.state.categoriesDisabled}
          key={index}
          index={index}
          data={object.value} />
        );
    }.bind(this));
      return (
            <div className='row'>
              <div className='col-md-2 col-md-offset-2'>
                <h1>Categories we need</h1>
                {categoryButtons}
              </div>
              <div className='col-md-2 col-md-offset-1'>
                <h1>Headers we got</h1>
                {fieldButtons}
              </div>
            </div>
          );
  }

});

module.exports = ButtonList;
