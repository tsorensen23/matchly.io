import {expect} from 'chai';
import reducer from '../client/home/reducers/headers-reducer'


var initialState;
describe('headers reducer', () => {
  beforeEach(() => {
  initialState = {
    data: [
    { "needed": "Military"},
    { "needed": "Country"},
    { "needed": "Citizenship" },
    { "needed": "University" },
    {"needed": "Employer"},
    {"needed": "Industry"},
    {"needed": "City"},
    {"needed": "State"},
    {"needed": "First Name"},
    {"needed": "Last Name"},
    {"needed": "Gender"},
    {"needed": "Class Visit Time"}],
    isFetching: false,
    lastUpdated: null
  }

  });

  it("has an inital state", () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  })
  it('takes a CHANGE_HEADER action and changes a specific key', () => {
    initialState.data[0].given = "MSTATUS";
    let action = {
      type: 'CHANGE_HEADER',
      needed: 'Military',
      given: 'MilVet'
    };
    let expectedOutput =  {
    data: [
    { "needed": "Military",
      "given": "MilVet"
    },
    { "needed": "Country"},
    { "needed": "Citizenship" },
    { "needed": "University" },
    {"needed": "Employer"},
    {"needed": "Industry"},
    {"needed": "City"},
    {"needed": "State"},
    {"needed": "First Name"},
    {"needed": "Last Name"},
    {"needed": "Gender"},
    {"needed": "Class Visit Time"}],
    isFetching: false,
    lastUpdated: null
  }
    expect(reducer(initialState, action)).to.eql(expectedOutput);
  })
  it("assigns the headers based on their position in the array when it SET_HEADERS action is dispatched", () => {
    let action = {
      type: 'SET_HEADERS',
      given: [ "MilStatus", "Country", "Citizen", "Uni", "Employer", "Industry", "City", "State", "First", "Last", "Sex", "Visit Time"]
    };
    let expectedOutput = {
      data: [
      { "needed": "Military","given": "MilStatus"},
      { "needed": "Country","given": "Country"},
      { "needed": "Citizenship","given": "Citizen"},
      { "needed": "University", "given": "Uni" },
      {"needed": "Employer", given: "Employer"},
      {"needed": "Industry", given: "Industry"},
      {"needed": "City", given: "City"},
      {"needed": "State", given: "State"},
      {"needed": "First Name", given: "First"},
      {"needed": "Last Name", given: "Last"},
      {"needed": "Gender", given: "Sex"},
      {"needed": "Class Visit Time", given: "Visit Time"}],
      isFetching: false,
      lastUpdated: null
    };
    expect(reducer(initialState, action)).to.eql(expectedOutput);
  });
  it('trims off clas visit time and adds email and section when you dispatch SET_HOSTS', () => {
    let action = {
      type: 'SET_HOSTS'
    };
  let expectedOutput = {
    data: [
    { "needed": "Military"},
    { "needed": "Country"},
    { "needed": "Citizenship" },
    { "needed": "University" },
    {"needed": "Employer"},
    {"needed": "Industry"},
    {"needed": "City"},
    {"needed": "State"},
    {"needed": "First Name"},
    {"needed": "Last Name"},
    {"needed": "Gender"},
    {needed: "Email", given: ""},
    {needed: "Section", given: "" }
    ],
    isFetching: false,
    lastUpdated: null
  };
    expect(reducer(initialState, action)).to.eql(expectedOutput);
  })
  it('SET_HEADERSGIVEN_TO_NEEDED', () => {
    let initialState = {
      data: [
      { "needed": "Military","given": "MilStatus"},
      { "needed": "Country","given": "Country"},
      { "needed": "Citizenship","given": "Citizen"},
      { "needed": "University", "given": "Uni" },
      {"needed": "Employer", given: "Employer"},
      {"needed": "Industry", given: "Industry"},
      {"needed": "City", given: "City"},
      {"needed": "State", given: "State"},
      {"needed": "First Name", given: "First"},
      {"needed": "Last Name", given: "Last"},
      {"needed": "Gender", given: "Sex"},
      {"needed": "Class Visit Time", given: "Visit Time"}],
      isFetching: false,
      lastUpdated: null
    };
    let action = {
      type: 'SET_HEADERSGIVEN_TO_NEEDED'
    };
    let expectedOutput = {
      data: [
      { "needed": "Military","given": "Military"},
      { "needed": "Country","given": "Country"},
      { "needed": "Citizenship","given": "Citizenship"},
      { "needed": "University", "given": "University" },
      {"needed": "Employer", given: "Employer"},
      {"needed": "Industry", given: "Industry"},
      {"needed": "City", given: "City"},
      {"needed": "State", given: "State"},
      {"needed": "First Name", given: "First Name"},
      {"needed": "Last Name", given: "Last Name"},
      {"needed": "Gender", given: "Gender"},
      {"needed": "Class Visit Time", given: "Class Visit Time"}],
      isFetching: false,
      lastUpdated: null
    }
    expect(reducer(initialState, action)).to.eql(expectedOutput)


  })
})
