var React = require('react');

var Login = require('./client/Login/Login.jsx');
var Register = require('./client/Login/Register.jsx');
var Home = require('./client/Home.jsx');
var App = require('./client/App.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;

var About = React.createClass({
  render: function() {
    return (<h2>About</h2>);
  }
});

var HomeWrapper = React.createClass({
  render: function() {
    return (
      <Home setIndexNumber={this.setIndexNumber} />
    );
  }
});

//these are the routes, they determine which component will be
//loaded for each url

var User = require('./client/Stores/UserStore');

var createHashHistory = require('history/lib/createHashHistory');

User.getUser(function(err, user) {
  if (err) {
    return window.location = '/login';
  }

  if (!user) {
    return window.location = '/login';
  }

  React.render(
    <Router history={createHashHistory()} createElement={function(Component,props) {
        return <Component user={user} {...props} />;
      }}>
      <Route component={App} >
        <Redirect from='/' to='/home' />
        <Route path='register' component={Register}/>
        <Route path='about' component={About}/>
        <Route path='login' component={Login}/>
        <Route path='home' component={HomeWrapper}/>
      </Route>
    </Router>,

    document.getElementById('main')
  );
});
