
import {expect } from 'chai';
import * as actions from '../client/workArea/Match/actions';
import nock from 'nock'
import mockStore from './mockStore.js';

describe('actions related to matches', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('dispatches REQUEST_MATCHES, fetches the matches and dispatches RECEIVE_MATCHES', (done) => {
    nock('http://localhost:3000/')
      .get('/match/')
      .query(true)
      .reply(200, { array: [ { name: 'rob'}] });
    const expectedActions = [
      { type: 'REQUEST_MATCHES' },
      { type: 'RECEIVE_MATCHES',data: [ { name: 'rob' }] }
    ];
    const store = mockStore({matches: {date: Date.now(), data: []}}, expectedActions, done);
    store.dispatch(actions.getMatches(function(){}));;
  }) 
})

