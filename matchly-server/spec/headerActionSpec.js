import {expect } from 'chai';
import * as actions from '../client/workArea/upload-redux/actions';
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'
const middlewares = [ thunk ]
import fetch from 'isomorphic-fetch';
import mockStore from './mockstore';

describe('Actions related to  the header', () => {
  it('change key action', () => {
    const expectedAction = {
      type: 'CHANGE_KEY',
      newKey: "FirstName",
      oldKey: "First"
    }
    expect(actions.changeKey("First", "FirstName")).to.eql(expectedAction);
  })
})
