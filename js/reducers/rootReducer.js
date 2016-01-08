/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import filterReducer from './filterReducer';
import dataReducer from './dataReducer';
import networkReducer from './networkReducer';

// Replace line below once you have several reducers with
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  filter: filterReducer,
  data: dataReducer,
  network: networkReducer
});

export default rootReducer;
