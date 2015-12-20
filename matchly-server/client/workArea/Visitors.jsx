var React = require('react');

var Visitor = React.createClass({
  render:function() {
    return (
      <tr>
        <td>
          {this.props.visitor.visitorFirstName + 
          this.props.visitor.visitorLastName}
        </td>
        <td>
          {this.props.visitor.hostFirstName +
          this.props.visitor.hostLastName}
        </td>
        <td>
          {this.props.visitor.hostEmail}
        </td>
        <td>
          {this.props.visitor.visitTime + ' ' + this.props.visitor.section}
        </td>
        <td className="text-center">
          {this.props.visitor.matchCount}
        </td>
        <td className="text-center">
          { this.props.visitor.Citizenship ? <span className="glyphicon glyphicon-ok"></span> : '' }
        </td>
        <td className="text-center">
          {this.props.visitor.City ? <span className="glyphicon glyphicon-ok"></span> : ''}
        </td>
        <td className="text-center">
          {this.props.visitor.Employer ? <span className="glyphicon glyphicon-ok"></span> : ''}
        </td>
        <td className="text-center">
          {this.props.visitor.Gender ? <span className="glyphicon glyphicon-ok"></span> : ''}
        </td>
        <td className="text-center">
          {this.props.visitor.Industry ? <span className="glyphicon glyphicon-ok"></span> : ''}
        </td>
        <td className="text-center">
          {this.props.visitor.Military ? <span className="glyphicon glyphicon-ok"></span> : ''}
        </td>
        <td className="text-center">
          {this.props.visitor.State ? <span className="glyphicon glyphicon-ok"></span> : ''}
        </td>
        <td className="text-center">
          {this.props.visitor.Undergrad ? <span className="glyphicon glyphicon-ok"></span> : ''}
        </td>
        <td className="text-center">
         {this.props.visitor.Country ? <span className="glyphicon glyphicon-ok"></span> : ''}
        </td>
      </tr>
    );
  }
});

module.exports = Visitor;
