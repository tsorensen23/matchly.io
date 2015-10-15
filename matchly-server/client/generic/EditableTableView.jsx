
var React = require('react');
var EditableItem = require('./EditableItem.jsx');

var TableView = React.createClass({
  getInitialState: function() {
    return {currentEdit:null};
  },

  render: function() {
    var _this = this;
    return (<table>
      <thead>
        <tr>{_this.props.headers.map(function(key) {
          var name = key.split('.');
          name = name.pop();
          return <td>{name}</td>;
        })}</tr>
      </thead>
      <tbody>{_this.props.items.map(function(item, index) {
        return (<tr key={index}>{
          _this.props.headers.map(function(key) {
            return <td><EditableItem object={item} name={key} /></td>;
          })
        }</tr>);
      })}</tbody>
    </table>);
  },
});

module.exports = TableView;
