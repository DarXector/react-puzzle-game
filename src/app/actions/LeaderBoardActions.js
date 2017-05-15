import axios from 'axios';

export const LEADERBOARD_FETCHED = 'leaderboard_fetched';

function receiveLeaderboard(json) {

    console.log('receiveLeaderboard', json);

    return {
        type: LEADERBOARD_FETCHED,
        payload: json
    }
}

export const fetchLeaderboard = () =>
{
    return dispatch =>
    {
        return axios.get('/leaderboard.php')
             .then(response => dispatch(receiveLeaderboard(response.data)))
    };
};