import { LOAD_DATA_SUCCESS } from '../constants/AppConstants';

function dataReducer(state = null, action) {
  switch (action.type) {
  case LOAD_DATA_SUCCESS:
    return action.data;
  default:
    return state;
  }
}

export default dataReducer;
