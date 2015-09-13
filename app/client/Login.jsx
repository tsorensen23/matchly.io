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
                        <table>
                          <tr>
                            <h3>Username: <input id='userName' type='text' /></h3>
                          </tr>
                          <tr>
                            <h3>Password: <input id='password' type='password' /></h3>
                          </tr>
                        </table>
                        <table>
                          <tr>
                            <div id="loginButtons">
                              <button id='submit' type='submit' onClick={this.checkLogin}>Login</button>
                              <button id='register' onClick={this.register}>Register</button>
                            </div>
                          </tr>
                        </table>
                      </div>
                    </div>
      </div>
    );
  }
});

module.exports = Login;
