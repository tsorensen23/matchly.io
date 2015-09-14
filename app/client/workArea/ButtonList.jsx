var React = require('react');
var Button = require('./Button.jsx');
var ButtonList = React.createClass({
  getInitialState: function() {
    return ({
      colors: ["#389adc", "#e74c3c", "#f1c40f", "#1abc9c", "#9b59b6", "#34495e", "#d35400", "#f39c12", "#16a085" ],
      index: null,
      categoriesDisabled: false,
      fieldsDisabled: true,
      fields: this.props.fields,
      categories: this.props.categories
    });
  },
  // changeColor takes a componenets index
  changeColor: function(buttonIndex) {
    if(!this.state.index) {
      this.setState({index: buttonIndex});
    } else {
      this.reorder(buttonIndex, this.state.index);
      this.setState({index: null});
    }
    this.toggleDisabled();
    console.log(buttonIndex);
  },
  reorder: function(currIndex, newIndex){
    console.warn('reorder was called');
    var tempFields = this.state.fields;
    var temp = tempFields[currIndex];
    tempFields[currIndex] = tempFields[newIndex];
    tempFields[newIndex] = temp;
    console.dir(this.state.fields);
    this.setState({fields: tempFields});
  },
  toggleDisabled: function() {
    this.setState({
      categoriesDisabled: !this.state.categoriesDisabled,
      fieldsDisabled: !this.state.fieldsDisabled
    });
  },
  render: function() {
    console.dir(this.state.fields);
    var fields = this.state.fields.map(function(value){
      return {
        value: value,
        color: null,
        matchIndex: null
      };
    });
    var categories = this.state.categories.map(function(value, i){
      return {
        value: value,
        color: this.state.colors[i],
        matchIndex: null
      };
    }.bind(this));

    var fieldButtons = fields.map(function(object, index) {
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
    var categoryButtons = categories.map(function(object, index) {
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
