import { combineReducers } from 'redux';
import citiesReducer from './slices/cities';

const rootReducer = combineReducers({
	cities: citiesReducer,
});

export default rootReducer;
