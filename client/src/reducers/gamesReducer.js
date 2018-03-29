import { FETCH_GAMES, FETCH_GAMES_USER_PLAYED } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_GAMES:
            return action.payload
        case FETCH_GAMES_USER_PLAYED:
            return action.payload
        default:
            return state;
    }
}