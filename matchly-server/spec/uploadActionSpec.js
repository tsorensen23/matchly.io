import {expect } from 'chai';
import * as actions from '../client/workArea/Match/actions';
import nock from 'nock'
import mockStore from './mockStore.js';

describe('actions related to finished visitor/host data', () => {
  afterEach(() => {
    nock.cleanAll()
  })
})

