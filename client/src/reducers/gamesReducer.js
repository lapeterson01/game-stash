import { FETCH_GAMES, FETCH_GAME } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_GAMES:
            return action.payload
        case FETCH_GAME:
            return action.payload
        default:
            return state;
    }
}