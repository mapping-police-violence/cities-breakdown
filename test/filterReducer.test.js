import expect from 'expect';
import filterReducer from '../js/reducers/filterReducer';
import * as constants from '../js/constants/AppConstants';
import assign from '../js/utils/assign';

const initialState = {
  city: null,
  crimeRate: [0, 1000],
  maxPossibleCrimeRate: 1000,
  maxPossibleMurderRate: 100,
  maxPossiblePopulation: 10000000,
  murderRate: [0, 100],
  population: [0, 10000000],
  race: constants.ALL_RACES,
  state: null,
};

// Test Reducer
describe('filterReducer', () => {
  it('should return the initial state', () => {
    testReducer(undefined, {}, initialState);
  });

  it('should handle the CHANGE_STATE action', () => {
    testReducer(initialState, {
      type: constants.CHANGE_STATE,
      state: 'California',
    }, assign(initialState, {state: 'california'}));
  });

  it('should handle the CHANGE_CITY_PREFIX action', () => {
    testReducer(initialState, {
      type: constants.CHANGE_CITY_PREFIX,
      city: 'San'
    }, assign(initialState, {city: 'san'}));
  });

  it('should handle the CHANGE_CRIME_RATE action', () => {
    testReducer(initialState, {
      type: constants.CHANGE_CRIME_RATE,
      crimeRate: [0, 10.00]
    }, assign(initialState, {crimeRate: [0, 10]}));
  });

  it('should handle the CHANGE_MURDER_RATE action', () => {
    testReducer(initialState, {
      type: constants.CHANGE_MURDER_RATE,
      murderRate: [0, 11.00]
    }, assign(initialState, {murderRate: [0, 11]}));
  });

  it('should handle the CHANGE_POPULATION action', () => {
    testReducer(initialState, {
      type: constants.CHANGE_POPULATION,
      population: [0, 987654321]
    }, assign(initialState, {population: [0, 987654321]}));
  });

  it('should handle the TOGGLE_RACE action', () => {
    testReducer(initialState, {
      type: constants.TOGGLE_RACE,
      race: 'black'
    }, assign(initialState, {
      race: constants.ALL_RACES.filter((race) => race !== 'black'),
    }));

    testReducer(assign(initialState, {race: []}), {
      type: constants.TOGGLE_RACE,
      race: 'black'
    }, assign(initialState, {
      race: ['black']
    }));
  });

  it('should handle the LOAD_DATA_SUCCESS action', () => {
  // TODO: write this test when data format is solidified
  // The reducer should handle this by finding the max and min of the relevant
  // filters and updating the default state.
  });
});

/**
 * Test a reducer on the given before/action/after triplet.
 *
 * @param  {Object} before The state before
 * @param  {Object} action The action to be performed
 * @param  {Object} after The state after
 */
function testReducer(before, action, after) {
  Object.freeze(before);
  expect(filterReducer(before, action)).toEqual(after);
}
