var React = require('react');
var LoginForm = require('./LoginForm.jsx');
var history = require('./history');

var Login = React.createClass({
  register: function() {
    history.replaceState(null, '/register');
  },

  handler: function(event) {
    event.preventDefault();
    var userName = React.findDOMNode(this.refs.username).value;
    var password = React.findDOMNode(this.refs.password).value;
    var profileObject = {
      username: userName,
      password: password
    };

    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(profileObject),
      url: '/userLogin',
      success: function(data) {
        window.location = '/';
      }
    });
  },

  keyDown: function(event) {
    if (event.key === 'Enter') {
      this.handler(event);
    }
  },

  render: function() {
    return (
      <div>
        <h1 id='header'>MATCHLY</h1>
        <div id='tabs'>
          <h4>Welcome! Please log in...</h4>
        </div>
        <div id='loginContainer'>
          <div id='credentials'>
            <h3>Username: <input onKeyDown={this.keyDown} ref='username' id='userName' type='text' /></h3>
            <h3>Password: <input onKeyDown={this.keyDown} ref='password' id='password' type='password' /></h3>
            <LoginForm handler={this.handler} register={this.register}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
