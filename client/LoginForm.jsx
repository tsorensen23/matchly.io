var React = require('react');

var LoginForm = React.createClass({
  checkLogin: function() {
    this.props.handler();
  },
  render: function() {
    return (
          <form onSubmit={this.checkLogin} >
            <div id='loginButtons'>
              <input type='submit' id='submit' value='Login' />
              <button id='register'>Register</button>
            </div>
          </form>
        );
  }
});
module.exports = LoginForm;
