import filterReducer from './filterReducer';
import networkReducer from './networkReducer';

import {combineReducers} from 'redux';
const rootReducer = combineReducers({
  filter: filterReducer,
  network: networkReducer
});

export default rootReducer;
