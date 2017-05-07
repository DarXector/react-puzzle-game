import {
    USER_UPDATE,
    USER_SAVE_SUCCESS
} from '../actions';

const INITIAL_STATE = {
    name: '',
    phone: '',
    email: '',
    city: '',
    country: ''
};

export default (state = INITIAL_STATE, action) =>
{
    switch (action.type)
    {
        case USER_UPDATE:
            return { ...state, [action.payload.prop]:action.payload.value };
            break;
        case USER_SAVE_SUCCESS:
            return INITIAL_STATE;
            break;
        default:
            return state;
    }
}