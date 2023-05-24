import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  successMsg: '',
  errorMsg: ''
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    commonReducerStart: (state) => {
      state.isLoading = true;
    },
    commonReducerSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.successMsg = payload;
    },
    commonReducerFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

export const { commonReducerStart, commonReducerSuccess, commonReducerFail } = commonSlice.actions;

export const commonSliceReducer = commonSlice.reducer;
