import axios from 'axios';
import { FETCH_USER, FETCH_GAMES, FETCH_SCORES } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchGames = () => async dispatch => {
    const res = await axios.get('/api/games')

    dispatch({ type: FETCH_GAMES, payload: res.data });
};

export const fetchScores = (game) => async dispatch => {
    const res = await axios.get(`/api/scores?game=${game}`)

    dispatch({ type: FETCH_SCORES, payload: res.data });
};