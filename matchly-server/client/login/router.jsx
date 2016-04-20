var ReactDOM = require('react-dom');
var React = require('react');

var Root = require('./Root/index.jsx');
var Login = require('./Login.jsx');
var Register = require('./Register.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;

var App = require('../App.jsx');

ReactDOM.render(
  <Router history={require('./history')}>
    <Route component = {App}>
      <Route path='/' component={Root} />
      <Route path='register' component={Register}/>
      <Route path='login' component={Login}/>
    </Route>
  </Router>, document.getElementById('main')
);
