
import {LEADERBOARD_FETCHED} from '../actions/LeaderBoardActions';

const initialState = [];

export default (state = initialState, action) => {

    switch(action.type) {
        case LEADERBOARD_FETCHED:
            return action.payload;
        default:
            return state;
    }
}