import { FETCH_SCORES } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SCORES:
            return action.payload;
        default:
            return state;
    }
}