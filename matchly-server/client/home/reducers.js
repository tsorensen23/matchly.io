import { combineReducers } from 'redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

import matches from './reducers/match-reducer';
import visitors from './reducers/visitors-reducer';
import hosts from './reducers/hosts-reducer';
import allEmployers from './reducers/employers-reducer';
import allSchools from './reducers/schools-reducer';
import finished from './reducers/finished-reducer';
import data from  './reducers/data-reducer';
import headers from './reducers/headers-reducer';
import hostsOrVisitors from './reducers/host-or-visitor-reducer';
import employerMatches from './reducers/employer-match-reducer';
import schoolMatches from './reducers/school-match-reducer';
import calendar from './reducers/calendar-reducer';
import upload from './reducers/upload-reducer';
import availability from './reducers/availability-reducer';
import twoSlots from './reducers/two-slot-reducer';
export default combineReducers({
  routing: routeReducer,
  hostsOrVisitors,
  visitors,
  matches,
  calendar,
  allSchools,
  availability,
  allEmployers,
  data,
  twoSlots,
  finished,
  headers,
  hosts,
  employerMatches,
  schoolMatches,
  upload
})
