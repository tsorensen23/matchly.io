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
        matchlycookie: document.cookie
      };
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profileObject),
        url: '/registerUser/',
        success: function(data) {
          window.location = '/';
        }.bind(this),
        error: function(data) {
          alert('registration failed, please try again');
        }

      });
    }
  },

  render: function() {
    return (
      <div style={{marginTop: '20'}}>
        <div style={{lineHeight: '1.4'}}>
          <h2>Welcome! <br />Please Register</h2>
        </div>
        <div className="col-xs-6 col-xs-offset-3 text-left">
          <table>
            <tbody>
              <tr>
                <h3>School Registration Code:
                  <input
                    id='schoolCode'
                    type='text'
                    style={{float: 'right'}}
                    required
                  />
                </h3>
              </tr>
              <tr>
                <h3>First Name:
                  <input
                    id='firstName'
                    type='text'
                    style={{float: 'right'}}
                    required
                  />
                </h3>
              </tr>
              <tr>
                <h3>Last Name:
                  <input
                    id='lastName'
                    type='text'
                    style={{float: 'right'}}
                    required
                  />
                </h3>
              </tr>
              <tr>
                <h3>Email Address:
                  <input
                    id='emailAddress'
                    type='text'
                    style={{float: 'right'}}
                    required
                  />
                </h3>
              </tr>
              <tr>
                <h3>Username:
                  <input
                    id='username'
                    type='text'
                    style={{float: 'right'}}
                    required
                  />
                </h3>
              </tr>
              <tr>
                <h3>Password:
                  <input
                    id='password'
                    type='password'
                    style={{float: 'right'}}
                    required
                  />
                </h3>
              </tr>
              <tr>
                <h3>Confirm Password:
                  <input
                    id='confirmPassword'
                    type='password'
                    style={{float: 'right'}}
                    required
                  />
                </h3>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <button
                  id='submitRegister'
                  type='submit'
                  onClick={this.handleRegister}
                  className="btn btn-success btn-block"
                  style={{marginTop: '20'}}
                >
                  Register
                </button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

});

module.exports = Register;
