var React = require('react');
var Button = require('./Button.jsx');
var ButtonList = React.createClass({
  getInitialState: function() {
    var colors = [
      "#389adc", 
      "#e74c3c", 
      "#f1c40f", 
      "#1abc9c", 
      "#9b59b6", 
      "#34495e", 
      "#d35400", 
      "#f39c12", 
      "#16a085", 
      "dodgerblue", 
      "peachpuff",
      "teal" 
    ];

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
    });
    return ({
      index: null,
      categoriesDisabled: true,
      matchedFieldsDisabled: false,
      fieldsDisabled: true,
      fields: fields,
      categories: categories,
    });
  },

  componentDidMount:function() {
    var prevHeaders = this.props.previousHeaders;
    console.log(prevHeaders);
    var matchedFields =[];
      for(var i=0;i<13;i++){
        matchedFields.push(
          <Button
          colorChange={this.changeColor}
          color="#ccc"
          disabled={this.state.matchedFieldsDisabled}
          key={i}
          index={i}
          data="" />
        );
      }
      this.setState({matchedFields:matchedFields});
  },
  callFieldsChange: function() {
    var awesome = this.state.fields.reduce(function (prev,curr) {
      prev.push(curr.value);
      return prev;
    }, []);
    awesome = awesome.splice(0,12);

    this.props.fieldsChanger(awesome);
  },

  //changeColor takes a componenets index
  changeColor: function(buttonIndex) {
    if(this.state.index === null) {
      this.setState({index: buttonIndex});
    } else {
      this.reorder(buttonIndex, this.state.index);
    }
    this.toggleDisabled();
  },

  reorder: function(currIndex, newIndex){
    var tempFields = this.state.fields;
    var temp = tempFields[currIndex];
    tempFields[currIndex] = tempFields[newIndex];
    tempFields[newIndex] = temp;
    tempFields[currIndex].color = '#ccc';
    tempFields[newIndex].color=this.state.categories[newIndex].color;
    this.setState({fields: tempFields,
                  index: null
    });
  },

  toggleDisabled: function() {
    this.setState({
      matchedFieldsDisabled: !this.state.matchedFieldsDisabled,
      fieldsDisabled: !this.state.fieldsDisabled
    });
  },

  render: function() {
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
          <div>
            <div className='row'>
              <div className='col-md-2 col-md-offset-2'>
                <h1>Categories we need</h1>
              </div>
              <div className='col-md-2 col-md-offset-1'>
                <h1>Headers we got</h1>
              </div>
              <div className='col-md-2'>
                <input id='confirm-button' type='button' value="Field Change" onClick={this.callFieldsChange}></input>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-2 col-md-offset-2'>
                {categoryButtons}
              </div>
              <div className='col-md-2 col-md-offset-2'>
                {this.state.matchedFields}
              </div>
              
              <div className='col-md-2 col-md-offset-1'>
                {fieldButtons}
              </div>
            </div>
          </div>
          );
  }

});

module.exports = ButtonList;
