
var React = require('react');
var EditableItem = require('./EditableItem.jsx');

var TableView = React.createClass({
  getInitialState: function(){
    return {currentEdit:null};
  },
  render: function(){
    var self = this;
    return <table>
      <thead>
        <tr>{self.props.headers.map(function(key){
          var name = key.split('.');
          name = name.pop();
          return <td>{name}</td>;
        })}</tr>
      </thead>
      <tbody>{self.props.items.map(function(item){
        return <tr>{self.props.headers.map(function(key){
          return <td><EditableItem object={item} name={key} /></td>
        })}</tr>
      })}</tbody>
    </table>
  }
});

module.exports = TableView;