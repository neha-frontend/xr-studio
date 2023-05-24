import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  successMsg: '',
  errorMsg: ''
};

const forgotPasswordSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    forgotPasswordStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    forgotPasswordSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.successMsg = payload;
    },
    forgotPasswordFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetForgotPasswordErrorMsg: (state) => {
      state.errorMsg = '';
    },

    // reset Password
    resetPasswordStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    resetPasswordSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.successMsg = payload;
    },
    resetPasswordFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetForgotPasswordErrorMsg,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFail
} = forgotPasswordSlice.actions;

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
