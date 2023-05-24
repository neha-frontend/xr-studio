import { combineReducers } from '@reduxjs/toolkit';
import { createTeamReducer } from './createTeamSlice';
import { favouriteTeamReducer } from './favouriteTeamSlice';
import { myTeamReducer } from './myTeamSlice';
import { teamDetailReducer } from './teamDetailSlice';

const myTeamRootReducer = combineReducers({
  myTeam: myTeamReducer,
  createTeam: createTeamReducer,
  teamDetail: teamDetailReducer,
  favouriteTeam : favouriteTeamReducer
});
export default myTeamRootReducer;
