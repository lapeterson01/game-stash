import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gamesReducer from './gamesReducer';
import gameReducer from './gameReducer';
import scoresReducer from './scoresReducer';
import userInfoReducer from './userInfoReducer';

export default combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer,
    games: gamesReducer,
    game: gameReducer,
    scores: scoresReducer
});