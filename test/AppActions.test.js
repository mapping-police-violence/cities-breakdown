import expect from 'expect';
import {
  changeState,
  changeCityPrefix,
  changeCrimeRate,
  changeMurderRate,
  changePopulation,
  toggleRace,
} from '../js/actions/AppActions';
import {
  CHANGE_CITY_PREFIX,
  CHANGE_CRIME_RATE,
  CHANGE_MURDER_RATE,
  CHANGE_POPULATION,
  CHANGE_STATE,
  TOGGLE_RACE,
} from '../js/constants/AppConstants';

describe('AppActions', () => {

  describe('changeState', () => {
    it('should change the state', () => {
      const state = 'California';
      const expectedResult = {
        type: CHANGE_STATE,
        state
      };

      expect(changeState(state)).toEqual(expectedResult);
    });
  });

  describe('changeCityPrefix', () => {
    it('should change the city name', () => {
      const city = 'San Fran';
      const expectedResult = {
        type: CHANGE_CITY_PREFIX,
        city
      };

      expect(changeCityPrefix(city)).toEqual(expectedResult);
    });
  });

  describe('changeCrimeRate', () => {
    it('should change the crime rate', () => {
      const crimeRate = [0, 100];
      const expectedResult = {
        type: CHANGE_CRIME_RATE,
        crimeRate
      };

      expect(changeCrimeRate(crimeRate)).toEqual(expectedResult);
    });
  });

  describe('changeMurderRate', () => {
    it('should change the crime rate', () => {
      const murderRate = [0, 100];
      const expectedResult = {
        type: CHANGE_MURDER_RATE,
        murderRate
      };

      expect(changeMurderRate(murderRate)).toEqual(expectedResult);
    });
  });

  describe('changePopulation', () => {
    it('should change the population', () => {
      const population = [0, 100000];
      const expectedResult = {
        type: CHANGE_POPULATION,
        population
      };

      expect(changePopulation(population)).toEqual(expectedResult);
    });
  });

  describe('toggleRace', () => {
    it('should toggle the race', () => {
      const race = 'white';
      const expectedResult = {
        type: TOGGLE_RACE,
        race
      };

      expect(toggleRace(race)).toEqual(expectedResult);
    });
  });
});
