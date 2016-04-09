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
