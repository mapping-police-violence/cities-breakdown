/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return (dispatch) => {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        };
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones

import d3 from 'd3';

import {
  CHANGE_CITY_PREFIX,
  CHANGE_CRIME_RATE,
  CHANGE_MURDER_RATE,
  CHANGE_POPULATION,
  CHANGE_STATE,
  TOGGLE_RACE,
  LOAD_DATA,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
  LOAD_CITIES_SUCCESS,
  SELECT_TAB
} from '../constants/AppConstants';

export function changeState(state) {
  return {type: CHANGE_STATE, state};
}

export function changeCityPrefix(city) {
  return {type: CHANGE_CITY_PREFIX, city};
}

export function changeCrimeRate(crimeRate) {
  return {type: CHANGE_CRIME_RATE, crimeRate};
}

export function changeMurderRate(murderRate) {
  return {type: CHANGE_MURDER_RATE, murderRate};
}

export function changePopulation(population) {
  return {type: CHANGE_POPULATION, population};
}

export function toggleRace(race) {
  return {type: TOGGLE_RACE, race};
}

export function selectTab(tab) {
  return {type: SELECT_TAB, tab};
}

export function loadData() {
  return {type: LOAD_DATA};
}

export function loadDataSuccess(data) {
  return {type: LOAD_DATA_SUCCESS, data};
}

export function loadCitiesSuccess(data) {
  return {type: LOAD_CITIES_SUCCESS, data};
}

export function loadDataError(error) {
  return {type: LOAD_DATA_ERROR, error};
}

export function fetchData() {
  return (dispatch) => {
    dispatch(loadData());

    d3.csv('/data/filtered.csv', (data) => {
      if (!data) {
        dispatch(loadDataError('Data failed to load'));
        return;
      }

      dispatch(loadDataSuccess(data));
    });

    d3.csv('/data/cities.csv', (data) => {
      if (!data) {
        dispatch(loadDataError('Cities failed to load'));
        return;
      }

      // Do some parsing
      const COMMAS = /,/g;
      /* eslint-disable camelcase */
      const parsedData = data.map((city) => Object.assign(city, {
        violent_crime_rate: Number(city.violent_crime_rate),
        murder_rate: Number(city.murder_rate),
        total: Number(city.total.replace(COMMAS, '')),
        black: Number(city.black.replace(COMMAS, '')),
        white: Number(city.white.replace(COMMAS, ''))
      }));
      /* eslint-enable */

      dispatch(loadCitiesSuccess(parsedData));
    });
  };
}
