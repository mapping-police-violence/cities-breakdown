import {
  LOAD_DATA,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS
} from '../constants/AppConstants';

function networkReducer(state = null, action) {
  switch (action.type) {
  case LOAD_DATA:
    return 'loading';
  case LOAD_DATA_ERROR:
    return 'error';
  case LOAD_DATA_SUCCESS:
    return 'loaded';
  default:
    return state;
  }
}

export default networkReducer;
