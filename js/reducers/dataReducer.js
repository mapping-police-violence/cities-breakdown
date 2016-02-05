import { LOAD_DATA_SUCCESS, LOAD_CITIES_SUCCESS } from '../constants/AppConstants';

const initialState = {
  murders: null,
  cities: null
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
  case LOAD_DATA_SUCCESS:
    return Object.assign({}, state, { murders: action.data });
  case LOAD_CITIES_SUCCESS:
    return Object.assign({}, state, { cities: action.data });
  default:
    return state;
  }
}

export default dataReducer;
