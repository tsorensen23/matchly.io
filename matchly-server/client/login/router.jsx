var React = require('react');

var Login = require('./Login.jsx');
var Register = require('./Register.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;

var App = require('../App.jsx');

React.render(
  <Router history={require('./history')}>
    <Route component = {App}>
      <Redirect from='/' to='/login' />
      <Route path='register' component={Register}/>
      <Route path='login' component={Login}/>
    </Route>
  </Router>,
  document.body
);
