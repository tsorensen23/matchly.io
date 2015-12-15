import {expect } from 'chai';
import {finishChangingKeys, changeValue, setDate, uploadData } from '../client/workArea/upload-redux/actions';
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'
const middlewares = [ thunk ]
import fetch from 'isomorphic-fetch';
import mockStore from './mockstore.js';

describe('upload actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('creates start upload on dispatch and success data upload when done', (done) => {
   nock('http://localhost:3000/')
      .post('/hosts', [{"name":"rob"}])
      .reply(200);
    const initialState = {
      finished: { data:[{ name: 'rob' }], isReady: false}
    }

    const expectedActions = [
      { type: 'START_UPLOAD' },
      { type: 'SUCCESS_DATA_UPLOAD'}
    ];
    const store = mockStore(initialState, expectedActions, done);
    store.dispatch(uploadData('http://localhost:3000/hosts'));
  })
  it('creates start upload on firing and error event on 404', (done) => {
   nock('http://localhost:3000/')
      .post('/hosts', [{"name":"rob"}])
      .reply(401);
    const initialState = {
      finished: {
        data: [ { name: 'rob' }],
        ready: false
      }
    }
    const expectedActions = [
      { type: 'START_UPLOAD' },
      { type: 'ERROR_UPLOAD', err: 401 }
    ];
    const store = mockStore(initialState, expectedActions, done);
    store.dispatch(uploadData('http://localhost:3000/hosts'));
  })
})
