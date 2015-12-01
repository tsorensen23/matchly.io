var React = require('react');

var LoginForm = React.createClass({
  checkLogin: function(event) {
    this.props.handler(event);
  },

  render: function() {
    return (
      <form onSubmit={this.checkLogin} >
        <div style={{margin: '15px 0 0'}}>
          <input
            className="btn btn-success btn-lg"
            type='submit'
            id='submit'
            value='Login'
            style={{
              margin: '10px 10px 10px 0',
              display: 'inline-block'
            }}
          />
          <div
            className="btn btn-info btn-lg"
            onClick={this.props.register}
            id='register'
          >
            Register
          </div>
        </div>
      </form>
    );
  }
});

module.exports = LoginForm;
