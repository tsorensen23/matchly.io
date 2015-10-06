var React = require('react');

var Register = React.createClass({

  handleRegister:function() {
    var schoolCode = $('#schoolCode').val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var emailAddress = $('#emailAddress').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();
    if (password !== confirmPassword) {
      alert('Please make sure your passwords match');
    } else if (!/.+@.+\..+/i.test(emailAddress)) {
      alert('Please enter a valid email address');
    } else {
      var profileObject = {
        schoolCode: schoolCode,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        username: username,
        password: password,
        matchlycookie: document.cookie,
      };
      console.log(profileObject, 'profile profileObject');
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profileObject),
        url: '/registerUser',
        success: function(data) {
          console.log('data', data);
          if (data.errors !== undefined) {
            console.log(data);
            alert('registration failed, please try again');
          } else {
            window.location = '/#/';
          }
        }.bind(this),
      });
    }
  },

  render: function() {
    return (
      <div>
        <h1 id='header'>MATCHLY</h1>
        <div id='tabs'>
          <h4>Welcome! Please register...</h4>
        </div>
        <div id='registerBox'>
            <div id='registerInput'>
                <table>
                  <tr>
                    <h3>School Registration Code: <input id='schoolCode' type='text' required /></h3>
                  </tr>
                  <tr>
                    <h3>First Name: <input id='firstName' type='text' required /></h3>
                  </tr>
                  <tr>
                    <h3>Last Name: <input id='lastName' type='text' required /></h3>
                  </tr>
                  <tr>
                    <h3>Email Address: <input id='emailAddress' type='email' required /></h3>
                  </tr>
                  <tr>
                    <h3>Username: <input id='username' type='text' required /></h3>
                  </tr>
                  <tr>
                    <h3>Password: <input id='password' type='password' required /></h3>
                  </tr>
                  <tr>
                    <h3>Confirm Password: <input id='confirmPassword' type='password' required /></h3>
                  </tr>
                </table>
                <table>
                  <tr>
                    <button id='submitRegister' type='submit' onClick={this.handleRegister}>Register</button>
                  </tr>
                </table>
            </div>
        </div>
      </div>
    );
  },

});

module.exports = Register;
