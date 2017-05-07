import { combineReducers } from 'redux';

import TimerReducer from './TimerReducer';
import UserFormReducer from './UserFormReducer';

const rootReducer = combineReducers({
  timer: TimerReducer,
  userForm: UserFormReducer,
});

export default rootReducer;
