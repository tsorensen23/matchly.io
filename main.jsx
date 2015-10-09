var React = require('react');

var Home = require('./client/Home.jsx');

var Match = require('./client/workArea/Match');
var Available = require('./client/workArea/Available.jsx');
var Upload = require('./client/workArea/Upload.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;

var About = React.createClass({
  render: function() {
    return (<h2>About</h2>);
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
      <Route component={Home} >
        <Redirect from='/' to='/match' />
        <Route path='match' component={Match} />
        <Route path='upload' component={Upload} />
        <Route path='available' component={Available} />
      </Route>
    </Router>,

    document.getElementById('main')
  );
});
