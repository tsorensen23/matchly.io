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
      matchedFields: [],
      fields: fields,
      categories: categories
    });
  },

  componentDidMount:function() {
    var prevHeaders = this.props.previousHeaders;
    
    // var matchedFields =[];
    //this for loop creates the matched fields buttons, but they are all blank
      // for(var i=0;i<12;i++){
      //   matchedFields.push({
      //     value: null,
      //     color: categories[i].color,
      //     matchIndex: null
      //   });
      // }
    var matchedFields=this.autoSortMatchedFields(this.state.fields, this.state.categories, prevHeaders,matchedFields);
    this.setState({matchedFields:matchedFields});
  },
  callFieldsChange: function() {
    console.log('matchedFields in button list',this.state.matchedFields);
    this.props.fieldsChanger(this.state.matchedFields);
    this.props.headersChanger(this.state.matchedFields);
    this.props.togglePageView();
  },

  autoSortMatchedFields:function(fields,categories, previousHeaders,matchedFields) {
    
    var matchedFieldsReturn=[];
    //how do I get matchedFields to have been set before autoSort is called in line 64????

    for(var i=0;i<categories.length;i++) {
      var previousHeaderString = previousHeaders[categories[i].value];
      for(var ii=0;ii<fields.length;ii++) {
        if(previousHeaderString === fields[ii].value) {
          //splice object out of fields
          var temp = fields.splice(ii,1);
          temp = temp[0];
          //push the object to the matched fields
          matchedFieldsReturn.push({
            value: temp.value,
            color: categories[i].color,
            matchIndex: null,
            category: categories[i].value
          });
          break;
        }
      }
      //ask sam about better way to write this so it only happens if you reach the end of the loop without finding what you're looking for
      if(ii===fields.length) {
        matchedFieldsReturn.push({
          value: null,
          color: categories[i].color,
          matchIndex: null,
          category: categories[i].value

        });
      }
    }
    this.setState({fields:fields});
    return matchedFieldsReturn;
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
  //currIndex is fields array
  //newIndex is matchedFields array
  var fields=this.state.fields;    
  var matchedFields=this.state.matchedFields;
  var temp=fields[currIndex].value;
  fields[currIndex].value=matchedFields[newIndex].value;
  matchedFields[newIndex].value=temp;

  this.setState({fields:fields});
  this.setState({matchedFields:matchedFields});
  this.setState({index:null});

    // var tempFields = this.state.fields;
    // var temp = tempFields[currIndex];
    // tempFields[currIndex] = tempFields[newIndex];
    // tempFields[newIndex] = temp;
    // tempFields[currIndex].color = '#ccc';
    // tempFields[newIndex].color=this.state.categories[newIndex].color;
    // this.setState({fields: tempFields,
    //               index: null
    // });
  },

  toggleDisabled: function() {
    this.setState({
      matchedFieldsDisabled: !this.state.matchedFieldsDisabled,
      fieldsDisabled: !this.state.fieldsDisabled
    });
  },

  render: function() {
    console.log('matchedFields',this.state.matchedFields);
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
    var matchedFields = this.state.matchedFields.map(function(object, index) {
      return (
        <Button
          colorChange={this.changeColor}
          color={object.color}
          disabled={this.state.matchedFieldsDisabled}
          key={index}
          index={index}
          data={object.value} />
        );
    }.bind(this));


      return (
          <div>
            <input id='confirm-button' type='button' value="Confirm Data" onClick={this.submitNewMatchedFields}></input>
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
                {matchedFields}
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
