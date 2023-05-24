import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  logoutLoading: false,
  authToken: localStorage.getItem('authToken') || '',
  loginEmail: '',
  errorMsg: ''
};

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    loginSuccess: (state, { payload }) => {
      state.errorMsg = '';
      state.isLoading = false;
      state.authToken = payload?.authToken;
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetLoginErrorMsg: (state) => {
      state.errorMsg = '';
    },

    // refreshToken
    refreshTokenStart: (state) => {
      state.errorMsg = '';
    },
    refreshTokenSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.authToken = payload?.freshCustomToken;
    },
    refreshTokenFail: (state, { payload }) => {
      state.errorMsg = payload;
    },

    // LOGOUT
    logoutStart: (state) => {
      state.logoutLoading = true;
      state.errorMsg = '';
    },
    logoutSuccess: (state) => {
      state.logoutLoading = false;
      state.isLoading = false;
      state.authToken = '';
      state.errorMsg = '';
    },
    logoutFail: (state, { payload }) => {
      state.logoutLoading = false;
      state.errorMsg = payload;
    },
    setAuthToken: (state, { payload }) => {
      state.authToken = payload.token;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  loginStart,
  loginSuccess,
  loginFail,
  resetLoginErrorMsg,
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
  setAuthToken
} = authSlice.actions;

export const authReducer = authSlice.reducer;
