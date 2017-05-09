import { browserHistory } from 'react-router'
import axios from 'axios';

export const USER_UPDATE = 'user_update';
export const USER_SAVE_SUCCESS = 'user_save_success';


export const userUpdate = ({ prop, value }) =>
{
    return {
        type: USER_UPDATE,
        payload: { prop, value }
    }
};


function userSaved() {
    browserHistory.push('/pregame');

    return {
        type: USER_SAVE_SUCCESS
    }
}


export const userSave = ({ name, phone, email, city, country }) =>
{
    console.log('userSave', name, phone, email, city, country);

    return dispatch =>
    {
        return axios.get(`/user.php?name=${name}&phone=${phone}&email=${email}&city=${city}&country=${country}`)
                    .then(response => dispatch(userSaved()))
    };
};
