import {expect} from 'chai'
import reducer from '../client/home/reducers'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.eql({
        "upload": false,
        "allEmployers": {
          "data": [],
          "isFetching": false,
          "lastUpdated": null
        },
        "allSchools": {
          "data": [],
          "isFetching": false,
          "lastUpdated": null
        },
        "calendar": {
          "data": [],
          "endDate": null,
          "isFetching": false,
          "startDate": null
        },
        "data": [],
        "employerMatches": {
          "data": [],
          "isFetching": false,
          "lastUpdated": null
        },
        "finished": {
          data: [],
          ready: false
        },
        "headers": {
          "data": [
            {
              "needed": "Military"
            },
            {
              "needed": "Country"
            },
            {
              "needed": "Citizenship"
            },
            {
              "needed": "University"
            },
            {
              "needed": "Employer"
            },
            {
              "needed": "Industry"
            },
            {
              "needed": "City"
            },
            {
              "needed": "State"
            },
            {
              "needed": "First Name"
            },
            {
              "needed": "Last Name"
            },
            {
              "needed": "Gender"
            },
            {
              "needed": "Class Visit Time"
            }
          ],
          "isFetching": false,
          "lastUpdated": null
        },
        "hostsOrVisitors": false,
        "matches": {
          "data": [],
          "isFetching": false,
          "lastUpdated": 0
        },
        "routing": {
          "changeId": 1,
          "path": undefined,
          replace: false,
          state: undefined,
        },
        "schoolMatches": {
          "data": [],
          "isFetching": false,
          "lastUpdated": null
        },
        "visitors": {
          "data": [],
          "isFetching": false,
          "lastUpdated": null
          },
        "hosts": {
          data: [],
          isFetching: false,
          data: [],
          lastUpdated: 0
        }
  })

  })
})
