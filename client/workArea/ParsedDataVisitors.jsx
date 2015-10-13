var React = require('react');

var ParsedDataVisitors = React.createClass({
  render:function() {
    return (
      <div>
        <h3 className='visitor'>Contact Information</h3>
        <h3 className='visitor'>First: {this.props.data.Contact.First}</h3>
        <h3 className='visitor'>Last: {this.props.data.Contact.Last}</h3>
        <h3 className='visitor'>Time: {this.props.data['Class Visit Time']}</h3>
        <h2 className='visitor'>Characteristics</h2>
        <h3 className='visitor'>Military: {this.props.data.Characteristics.Military}</h3>
        <h3 className='visitor'>Country: {this.props.data.Characteristics.Country}</h3>
        <h3 className='visitor'>Citizenship: {this.props.data.Characteristics.Citizenship}</h3>
        <h3 className='visitor'>Undergrad: {this.props.data.Characteristics.Undergrad}</h3>
        <h3 className='visitor'>Employer: {this.props.data.Characteristics.Employer}</h3>
        <h3 className='visitor'>Industry: {this.props.data.Characteristics.Industry}</h3>
        <h3 className='visitor'>City: {this.props.data.Characteristics.City}</h3>
        <h3 className='visitor'>State: {this.props.data.Characteristics.State}</h3>
      </div>
    );
  }
});

module.exports = ParsedDataVisitors;
