import {expect} from 'chai'
import upload from '../client/home/reducers/upload-reducer'
var initalState =[];
describe('finished reducer', () => {
  it('has a proper initial state', () => {
    expect(upload(undefined, {})).to.eql(false)
  })
  // these belong in another spec
  it('START_UPLOAD', () => {
    expect(upload(false, { type: 'START_UPLOAD'})).to.eql(true);
  })
  it('SUCCESS_DATA_UPLOAD', () => {
    expect(upload(true, { type: 'SUCCESS_DATA_UPLOAD'})).to.eql(false);
  })
  it('ERROR_UPLOAD', () => {
    expect(upload(true, { type: 'SUCCESS_DATA_UPLOAD'})).to.eql(false);
  })
})
