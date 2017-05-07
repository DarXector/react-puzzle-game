import { browserHistory } from 'react-router'

export const USER_UPDATE = 'user_update';
export const SAVE_RESULT = 'save_result';
export const USER_SAVE_SUCCESS = 'user_save_success';


export const userUpdate = ({ prop, value }) =>
{
    return {
        type: USER_UPDATE,
        payload: { prop, value }
    }
};


export const userSave = ({ name, phone, email, city, country }) =>
{
    return (dispatch) =>
    {
        browserHistory.push('/pregame');
    };
};

export const saveResult = ({ time }) =>
{
    return (dispatch) =>
    {
        browserHistory.push('/gameend');
    };
};
