import axios from 'axios';
import { FETCH_USER, FETCH_GAMES, FETCH_GAME, FETCH_SCORES, POST_GAME, POST_SCORE, FETCH_USER_INFO, FETCH_GAMES_USER_PLAYED } from './types';

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

export const postGame = (file) => async dispatch => {
    let formData = new FormData();
    formData.append('file', file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const res = await axios.post('/api/games', formData)

    dispatch({ type: POST_GAME, payload: res.data });
}

export const postScore = (game, score) => async dispatch => {
    const data = {
        game,
        score
    }
    
    const res = await axios.post('/api/scores', data)

    dispatch({ type: POST_SCORE, payload: res.data });
}

export const fetchUserInfo = (user) => async dispatch => {
    const res = await axios.get(`/api/${user}/info`);

    dispatch({ type: FETCH_USER_INFO, payload: res.data });
}

export const fetchGamesUserPlayed = (userID) => async dispatch => {
    const res = await axios.get(`/api/${userID}/games/played`);

    dispatch({ type: FETCH_GAMES_USER_PLAYED, payload: res.data });
}