import { combineReducers } from '@reduxjs/toolkit';
import { settingReducer } from './settingSlice';
import { updateProfileReducer } from './updateProfileSlice';

const profileRootReducer = combineReducers({
  updateProfile: updateProfileReducer,
  setting: settingReducer
});
export default profileRootReducer;
