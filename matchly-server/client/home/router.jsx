var React = require('react');

var Home = require('../Home.jsx');

var Match = require('../workArea/Match/index.jsx');
var Available = require('../workArea/Available.jsx');
var Upload = require('../workArea/upload-redux/index.js');
var Calendar = require('../workArea/calendar/calendar.jsx');

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

var User = require('../Stores/UserStore');

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
        <Route path='calendar' component={Calendar} />
      </Route>
    </Router>,

    document.getElementById('main')
  );
});
