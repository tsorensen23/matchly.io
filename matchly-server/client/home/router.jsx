var ReactDOM = require('react-dom');
var React = require('react');

import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'


import { Provider } from 'react-redux'
var Home = require('../Home.jsx');

var Match = require('../workArea/Match/index.jsx');
var Available = require('../workArea/Available.jsx');
var Upload = require('../workArea/upload-redux/index.js');
var Calendar = require('../workArea/calendar/calendar.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;

import store from './store';
//these are the routes, they determine which component will be
//loaded for each url

var User = require('../Stores/UserStore');

var createHashHistory = require('history/lib/createHashHistory');
var history = createHashHistory();

syncReduxAndRouter(history, store)

User.getUser(function(err, user) {
  if (err) {
    return window.location = '/login';
  }

  if (!user) {
    return window.location = '/login';
  }

  ReactDOM.render(
      <div className="row">
        <div className="col-xs-12">
          <Provider store={store}>
            <Router history={history}>
              <Route component={Home} >
                <Redirect from='/' to='/calendar' />
                <Route path='match' component={Match} />
                <Route path='upload' component={Upload} />
                <Route path='available' component={Available} />
                <Route path='calendar' component={Calendar} />
              </Route>
            </Router>
          </Provider>
        </div>

      </div>
    , document.getElementById('main')
  );
});
