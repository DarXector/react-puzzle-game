import {
    USER_UPDATE,
    USER_SAVE_SUCCESS,
    USER_SAVE_ERROR,
    USER_REGISTERED,
    USER_NOT_REGISTERED
} from '../actions';

const INITIAL_STATE = {
    name: '',
    phone: '',
    email: '',
    city: '',
    country: '',
    errorMessage: '',
    loggedIn: false,
};

export default (state = INITIAL_STATE, action) =>
{
    console.log('UserFormReducer', action, state);

    switch (action.type)
    {
        case USER_UPDATE:
            return { ...state, [action.payload.prop]:action.payload.value };
            break;
        case USER_SAVE_SUCCESS:
            return { ...state, loggedIn:true, errorMessage:'' };
            break;
        case USER_REGISTERED:
            return { ...state, loggedIn:true, errorMessage:'' };
            break;
        case USER_NOT_REGISTERED:
            return { ...state, errorMessage:'' };
            break;
        case USER_SAVE_ERROR:
            return { ...state, errorMessage:action.payload } ;
            break;
        default:
            return state;
    }
}