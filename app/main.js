var React = require('react');

var Login = require('./client/Login.jsx');
var Register = require('./client/Register.jsx');
var Home = require('./client/Home.jsx');
var CheckLogin = require('./client/CheckLogin.jsx');

var Router = require('react-router');
var Route = Router.Route;


var About = React.createClass({
  render: function () {
    return <h2>About</h2>;
  }
});

var HomeWrapper = React.createClass({
  render: function () {
    return (
        <Home setIndexNumber={this.setIndexNumber} />
    );
  }
});

var LoginWrapper = React.createClass({
  render: function () {
    return (
        <Login setState={this.setState} />
    );
  }
});

//these are the routes, they determine which component will be
//loaded for each url
var routes = (
  <Route handler={App}>
    <Route path="" handler={CheckLogin}/>
    <Route path="register" handler={Register}/>
    <Route path="about" handler={About}/>
    <Route path="login" handler={LoginWrapper}/>
    <Route path="home" handler={HomeWrapper}/>
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
    )
  }
});

Router.run(routes, Router.HashLocation, function(Root){
  React.render(<Root/>, document.getElementById('main'));
});

