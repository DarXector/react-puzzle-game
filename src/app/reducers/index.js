import { combineReducers } from 'redux';

import TimerReducer from './TimerReducer';
import UserFormReducer from './UserFormReducer';
import LeaderBoardReducer from './LeaderBoardReducer';

const rootReducer = combineReducers({
  timer: TimerReducer,
  userForm: UserFormReducer,
  leaderboard: LeaderBoardReducer,
});

export default rootReducer;
