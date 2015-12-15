import {expect} from 'chai'
import reducer from '../client/home/reducers/calendar-reducer'
import moment from 'moment';

var initialState = {
  data: [],
  endDate: null,
  isFetching: false,
  startDate: null
};

describe('calendar reducer', () => {
  it('should return the inital state', () =>{
    expect(reducer(undefined, {})).to.eql({
      data: [],
      endDate: null,
      isFetching: false,
      startDate: null
    })
  })
  it('assigns the start and end Date and converts them to ISOString if they are', () => {

    var action = {
      type: 'SET_START_END_DATE', 
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    }
    expect(reducer(initialState,  action)).to.eql({
      data: [],
      endDate: moment().endOf('month').toISOString(),
      startDate: moment().startOf('month').toISOString(),
      isFetching: false
    });
  });
});
