import axios from 'axios';

export const USER_UPDATE = 'user_update';
export const USER_SAVE_SUCCESS = 'user_save_success';
export const USER_SAVE_ERROR = 'user_save_error';
export const USER_REGISTERED = 'user_registered';
export const USER_NOT_REGISTERED = 'user_not_registered';


export const userUpdate = ({ prop, value }) =>
{
    return {
        type: USER_UPDATE,
        payload: { prop, value }
    }
};

function userSaved(response) {

    console.log('userSaved', response);

    if(response.status == "1") {
        return {
            type: USER_SAVE_SUCCESS
        }
    } else {
        return {
            type: USER_SAVE_ERROR,
            payload: response.message
        }
    }
}

function userRegistered(response) {

    console.log('userRegistered', response);

    if(response == "1") {
        return {
            type: USER_REGISTERED
        }
    } else {
        return {
            type: USER_NOT_REGISTERED
        }
    }
}

export const userCheckRegistered = ({ userid }) =>
{
    console.log('userCheckRegistered', userid);

    return dispatch =>
    {
        return axios.post('/fbcheck.php', { userid })
                    .then(response => dispatch(userRegistered(response.data)))
    };
};

export const userSave = ({ name, phone, email, city, country, userid }) =>
{
    console.log('userSave', name, phone, email, city, country, userid);

    return dispatch =>
    {
        return axios.post('/user.php', {
                userid,
                name,
                phone,
                email,
                city,
                country,
            }).then(response => dispatch(userSaved(response.data)))
    };
};
