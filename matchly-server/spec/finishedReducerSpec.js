import {expect} from 'chai'
import reducer from '../client/home/reducers/finished-reducer'

describe('finished data reducer', () => {
  it('has en empty array and ready is false on inital load', () => {
    expect(reducer(undefined, {})).to.eql({
      data: [],
      ready: false
    });
  })
  it('sets gender on all visitors when SET_GENDER', () => {
    const initialState = {
      data: [
        {First: 'rob', Last: 'Wilkinson' },
        {First: 'Rouzbeh', Last: 'Sarrafieh'}
      ],
      ready: false
    }
    const action = {
      type: 'SET_GENDER',
      gender: 'Male'
    }
    expect(reducer(initialState, action)).to.eql({
      data: [
        {First: 'rob', Last: 'Wilkinson', Gender: 'Male' },
        {First: 'Rouzbeh', Last: 'Sarrafieh', Gender: 'Male'}
      ],
      ready: false
    })
  })
})
