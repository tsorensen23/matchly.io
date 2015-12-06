var React = require('react');

var Visitor = React.createClass({
  render:function() {
    return (
      <tr>
        <td>
          {this.props.visitor.visitorFirstName}
        </td>
        <td>
          {this.props.visitor.visitorLastName}
        </td>
        <td>
          {this.props.visitor.hostFirstName}
        </td>
        <td>
          {this.props.visitor.hostLastName}
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
          { this.props.visitor.Citizenship ? this.props.visitor.Citizenship.toString() : '' }
        </td>
        <td>
          {this.props.visitor.City ? this.props.visitor.City.toString() : ''}
        </td>
        <td>
          {this.props.visitor.Employer ? this.props.visitor.Employer.toString() : ''}
        </td>
        <td>
          {this.props.visitor.Gender ? this.props.visitor.Gender.toString() : ''}
        </td>
        <td>
          {this.props.visitor.Industry ? this.props.visitor.Industry.toString() : ''}
        </td>
        <td>
          {this.props.visitor.Military ? this.props.visitor.Military.toString() : ''}
        </td>
        <td>
          {this.props.visitor.State ? this.props.visitor.State.toString() : ''}
        </td>
        <td>
          {this.props.visitor.Undergrad ? this.props.visitor.Undergrad.toString() : ''}
        </td>
        <td>
          {this.props.visitor.Country ? this.props.visitor.Country.toString() : ''}
        </td>
      </tr>
    );
  }
});

module.exports = Visitor;
