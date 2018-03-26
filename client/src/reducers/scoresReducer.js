import { FETCH_SCORES } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_SCORES:
            return action.payload;
        default:
            return state;
    }
}