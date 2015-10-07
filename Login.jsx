var React = require('react');

var Login = require('./client/Login/Login.jsx');
var Register = require('./client/Login/Register.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;

var App = require('./client/App.jsx');

var createHashHistory = require('history/lib/createHashHistory');
console.log(History);
React.render(
  <Router history={createHashHistory()}>
    <Route component = {App}>
      <Redirect from='/' to='/login' />
      <Route path='register' component={Register}/>
      <Route path='login' component={Login}/>
    </Route>
  </Router>,
  document.body
);
