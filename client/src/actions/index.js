import axios from 'axios';
import { FETCH_USER, FETCH_GAMES, FETCH_GAME, FETCH_SCORES } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchGames = (search) => async dispatch => {
    let url = `/api/games${search ? `?search=${search}` : ''}`;

    const res = await axios.get(url)

    dispatch({ type: FETCH_GAMES, payload: res.data });
};

export const fetchGame = (gameID) => async dispatch => {
    const res = await axios.get(`/api/games/${gameID}`)

    dispatch({ type: FETCH_GAME, payload: res.data });
}

export const fetchScores = (game) => async dispatch => {
    const res = await axios.get(`/api/scores?game=${game}`)

    dispatch({ type: FETCH_SCORES, payload: res.data });
};