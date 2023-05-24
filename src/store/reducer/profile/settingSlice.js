import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  privacySettting: null,
  data: null,
  errorMsg: ''
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateSettingStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    updateSettingSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.privacySettting = payload;
    },
    updateSettingFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    updatePasswordStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    updatePasswordSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    updatePasswordFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  updateSettingStart,
  updateSettingSuccess,
  updateSettingFail,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFail
} = settingSlice.actions;

export const settingReducer = settingSlice.reducer;
