import { combineReducers } from 'redux';
import newsTypes from './newsTypesReducer';
import news from './newsReducer';

const rootReducer = combineReducers({
  newsTypes,
  news,
});

export default rootReducer;