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
      url: '/userLogin/',
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
      <div className="row">
        <div className="col-xs-12 text-center">
          <h3 style={{lineHeight: '1.4', marginBottom: '20'}}>
            Welcome!<br />
            Please Log In
          </h3>
        </div>
        <div id='loginContainer'>
          <div id='credentials'>
            <h3>
              Username:
            <input
              onKeyDown={this.keyDown}
              ref='username'
              id='userName'
              type='text'
              style={{marginLeft: '20'}}
            />
            </h3>
            <h3>
              Password:
            <input
              onKeyDown={this.keyDown}
              ref='password'
              id='password'
              type='password'
              style={{marginLeft: '20'}}
            />
            </h3>
            <p style={{
              margin: '10px 0 0',
              fontSize: '14'
            }}>
              Not registered yet? Click Register below to get started.
            </p>
            <LoginForm handler={this.handler} register={this.register}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
