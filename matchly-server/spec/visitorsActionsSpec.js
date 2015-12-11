import {expect } from 'chai';
import * as actions from '../client/workArea/Match/actions';
import nock from 'nock'
import mockStore from './mockStore.js';

describe('visitordata realted actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('creates RECEIVE_VISITORS when fetching visitors has been done', (done) => {
    nock('http://localhost:3000/')
      .get('/visitors')
      .query(true)
      .reply(200, { visitors: [ { name: 'rob'}] });
    const expectedActions = [
      { type: 'REQUEST_VISITORS' },
      { type: 'RECEIVE_VISITORS',data: { visitors: [ { name: 'rob' }]} }
    ];
    const store = mockStore({ matches: {date: '2015-12-04', data: []}}, expectedActions, done);
    store.dispatch(actions.getAllVisitors());
  })
})
