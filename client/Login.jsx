//login
var React = require('react');

var Login = React.createClass({
  checkLogin: function(){
    console.log('checkLogin');
    var userName=$('#userName').val();
    var password=$('#password').val();
    var profileObject={
      username: userName,
      password: password
    };
    console.log(profileObject,"profileObject");
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profileObject),
        url: '/userLogin',
          success: function(data) {
            console.log(data, "data");
            window.location='/#/home';

          }.bind(this)
        });
  },

  register: function(){
    console.log('register fire');
    window.location='/#/register';
  },

  render: function(){
    return(
      <div>
        <h1 id="header">MATCHLY</h1>
        <div id="tabs">
          <h4>Welcome! Please log in...</h4>
        </div>
                    <div id='loginContainer'>
                      <div id='credentials'>
                            <h3>Username: <input id='userName' type='text' /></h3>
                            <h3>Password: <input id='password' type='password' /></h3>
                            <form action="#" onSubmit={this.checkLogin} >
                            <div id="loginButtons">
                              <input id='submit' type='submit' value="Login" />
                              <button id='register' onClick={this.register}>Register</button>
                            </div>
                            </form>
                      </div>
                    </div>
      </div>
    );
  }
});

module.exports = Login;
