var React = require('react');

var ParsedDataHosts = React.createClass({
  render:function() {
    console.log(this.props.data);
    return (
      <div>
        <h3 className='host'>First: {this.props.data.Contact.First}</h3>
        <h3 className='host'>Last: {this.props.data.Contact.Last}</h3>
        <h3 className='host'>Email: {this.props.data.Contact.Email}</h3>
        <h3 className='host'>Section: {this.props.data.Section}</h3>
        <h2 className='host'>Characteristics</h2>
        <h3 className='host'>Military: {this.props.data.Characteristics.Military}</h3>
        <h3 className='host'>Country: {this.props.data.Characteristics.Country}</h3>
        <h3 className='host'>Citizenship: {this.props.data.Characteristics.Citizenship}</h3>
        <h3 className='host'>Undergrad: {this.props.data.Characteristics.Undergrad}</h3>
        <h3 className='host'>Employer: {this.props.data.Characteristics.Employer}</h3>
        <h3 className='host'>Industry: {this.props.data.Characteristics.Industry}</h3>
        <h3 className='host'>City: {this.props.data.Characteristics.City}</h3>
        <h3 className='host'>State: {this.props.data.Characteristics.State}</h3>
      </div>
    );
  },
});

module.exports = ParsedDataHosts;
