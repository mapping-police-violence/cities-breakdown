/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the filterReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

import {
  ALL_RACES,
  CHANGE_CITY_PREFIX,
  CHANGE_CRIME_RATE,
  CHANGE_MURDER_RATE,
  CHANGE_POPULATION,
  CHANGE_STATE,
  TOGGLE_RACE,
  SELECT_TAB,
  LOAD_CITIES_SUCCESS
} from '../constants/AppConstants';
import assign from '../utils/assign';
import { max } from 'd3';

const initialState = {
  city: null,
  crimeRate: [0, 1000],
  maxPossibleCrimeRate: 1000,
  maxPossibleMurderRate: 100,
  maxPossiblePopulation: 10000000,
  murderRate: [0, 100],
  population: [0, 10000000],
  race: ALL_RACES.map((s) => s.toLowerCase()),
  state: null,
  selectedTab: 0
};

function filterReducer(state = initialState, action) {
  switch (action.type) {
  case CHANGE_CITY_PREFIX:
    return assign(state, {city: action.city.toLowerCase().trim()});

  case CHANGE_CRIME_RATE:
    return assign(state, {
      crimeRate: action.crimeRate
    });

  case CHANGE_MURDER_RATE:
    return assign(state, {
      murderRate: action.murderRate
    });

  case CHANGE_POPULATION:
    return assign(state, {
      population: action.population,
    });

  case CHANGE_STATE:
    return assign(state, {
      state: action.state.toLowerCase()
    });

  case TOGGLE_RACE:
    let toggleIndex = state.race.indexOf(action.race);
    let updatedRace;

    if (toggleIndex === -1) {
      updatedRace = [
        ...state.race,
        action.race
      ];
    } else {
      updatedRace = [
        ...state.race.slice(0, toggleIndex),
        ...state.race.slice(toggleIndex + 1)
      ];
    }
    return assign(state, {race: updatedRace});

  case SELECT_TAB:
    return assign(state, { selectedTab: action.tab });

  case LOAD_CITIES_SUCCESS:
    const maxPossiblePopulation =
        max(action.data.map((city) => city.total));
    const maxPossibleCrimeRate = max(action.data.map((city) => city.violent_crime_rate));
    const maxPossibleMurderRate = max(action.data.map((city) => city.murder_rate));

    return assign(state, {
      maxPossibleCrimeRate,
      maxPossiblePopulation,
      maxPossibleMurderRate,
      population: [state.population[0], Math.min(state.population[1], maxPossiblePopulation)],
      crimeRate: [state.crimeRate[0], Math.min(state.crimeRate[1], maxPossibleCrimeRate)],
      murderRate: [state.murderRate[0], Math.min(state.murderRate[1], maxPossibleMurderRate)],
    });

  default:
    return state;
  }
}

export default filterReducer;
