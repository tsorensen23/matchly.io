import {expect } from 'chai';
import * as actions from '../client/workArea/Match/actions';
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'
const middlewares = [ thunk ]
import fetch from 'isomorphic-fetch';
import mockStore from './mockstore';

describe('host actions', () => {
  beforeEach(() => {
    nock.cleanAll();
  });
  it('should return a SET_DATE action with the date ', () => {
    const date = new Date();
    const expectedAction = {
      type: 'SET_DATE_MATCH',
      date
    }
    expect(actions.setDate(date)).to.eql(expectedAction)
  })

  it('creates RECEIVE_HOSTS when fetching hosts has been done', (done) => {
    nock(process.env.URL)
      .get('/hosts')
      .reply(200, { hosts: [ { name: 'rob'}] });
    const expectedActions = [
      { type: 'REQUEST_HOSTS' },
      { type: 'RECEIVE_HOSTS',data: { hosts: [ { name: 'rob' }]} }
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(actions.getAllHosts());;
  })

  it('returns a TOGGLE_HOST type action', function(done) {
    var d = new Date();
    nock(process.env.URL)
      .get('/hosts/exception-date')
      .query(true)
      .reply(200, { update: {hosts: [ {_id: 12345, exceptionDate: [d] }] }});
    var host = {
      _id: 12345,
      on: true,
      date: '2015-12-09'
    }
    const expectedActions = [
    { 
      type: 'TOGGLE_HOST', 
      data: {
        update: {
          hosts: [
            { _id: 12345, exceptionDate: [d.toISOString()]}
          ]
        }
      }
    }
    ];
    const store = mockStore({matches: {date: d }}, expectedActions, done);
    store.dispatch(actions.toggleHost(host, true));
  })
})
