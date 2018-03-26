import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gamesReducer from './gamesReducer';
import scoresReducer from './scoresReducer';

export default combineReducers({
    auth: authReducer,
    games: gamesReducer,
    scores: scoresReducer
});