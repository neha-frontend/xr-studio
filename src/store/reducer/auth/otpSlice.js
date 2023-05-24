import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  otpId: '',
  isLoading: false,
  errorMsg: '',
  purpose: '',
  codeVerification: '',
  resendDuration: 30
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    //Send OTP
    sendOtpStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    sendOtpSuccess: (state, { payload }) => {
      state.errorMsg = '';
      state.isLoading = false;
      state.data = payload;
      state.otpId = payload?.items[0]?.codeVerification?._id;
      state.purpose = payload?.items[0]?.codeVerification?.purpose;
      state.resendDuration = payload?.items[0]?.codeVerification?.resendDuration;
    },
    sendOtpFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },

    //VERIFY OTP
    verifyOtpStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    verifyOtpSuccess: (state, { payload }) => {
      state.errorMsg = '';
      state.isLoading = false;
      state.data = payload;
      state.codeVerification = payload?.items[0]?.codeVerification?._id;
    },
    verifyOtpFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

export const {
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFail,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFail
} = otpSlice.actions;

export const otpReducer = otpSlice.reducer;
