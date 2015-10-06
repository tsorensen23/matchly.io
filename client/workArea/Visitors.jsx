var React = require('react');

var Visitor = React.createClass({
  render:function() {
    return (
      <tr>
        <td>
          {this.props.visitor.visitorName}
        </td>
        <td>
          {this.props.visitor.hostName}
        </td>
        <td>
          {this.props.visitor.hostEmail}
        </td>
        <td>
          {this.props.visitor.section}
        </td>
        <td>
          {this.props.visitor.visitTime}
        </td>
        <td>
          {this.props.visitor.matchCount}
        </td>
        <td>
          {this.props.visitor.Citizenship.toString()}
        </td>
        <td>
          {this.props.visitor.City.toString()}
        </td>
        <td>
          {this.props.visitor.Employer.toString()}
        </td>
        <td>
          {this.props.visitor.Gender.toString()}
        </td>
        <td>
          {this.props.visitor.Industry.toString()}
        </td>
        <td>
          {this.props.visitor.Military.toString()}
        </td>
        <td>
          {this.props.visitor.State.toString()}
        </td>
        <td>
          {this.props.visitor.Undergrad.toString()}
        </td>
        <td>
          {this.props.visitor.Country.toString()}
        </td>
      </tr>
    );
  },
});

module.exports = Visitor;
