import { combineReducers } from '@reduxjs/toolkit';
import { forgotPasswordReducer } from './forgotPasswordSlice';
import { authReducer } from './loginSlice';
import { otpReducer } from './otpSlice';
import { registerReducer } from './registerSlice';

const authRootReducer = combineReducers({
  login: authReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
  otp: otpReducer
});
export default authRootReducer;
