var React = require('react');

var Login = require('./client/Login.jsx');
var Register = require('./client/Register.jsx');

var Router = require('react-router');
var Route = Router.Route;

var LoginWrapper = React.createClass({
  render: function () {
    return (
        <Login setState={this.setState} />
    );
  }
});
var LoginRedirect = React.createClass({
  render: function(){
    window.location='#/login';
    return null;
  }
});

//these are the routes, they determine which component will be
//loaded for each url
var routes = (
  <Route handler={App}>
    <Route path="" handler={LoginRedirect} />
    <Route path="register" handler={Register}/>
    <Route path="login" handler={LoginWrapper}/>
  </Route>
);

var RouteHandler = Router.RouteHandler;

var App = React.createClass({

  render: function() {
    var appScope=this;
    return (
      <div>
        <h1>App</h1>
        <h2>Hello {this.state.name}</h2>
        <RouteHandler/>
      </div>
    );
  }
});

Router.run(routes, Router.HashLocation, function(Root){
  React.render(<Root/>, document.body);
});
