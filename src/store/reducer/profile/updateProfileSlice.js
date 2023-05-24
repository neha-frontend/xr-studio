import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  profileData: null,
  favouriteLoader: false,
  favouriteTeam: null,
  errorMsg: ''
};

const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    updateProfileStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    updateProfileSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.profileData = payload;
    },
    updateProfileFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    getProfileStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    getProfileSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.profileData = payload;
    },
    getProfileFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    getFavouriteTeamStart: (state) => {
      state.favouriteLoader = true;
      state.errorMsg = '';
    },
    getFavouriteTeamSuccess: (state, { payload }) => {
      state.favouriteLoader = false;
      state.favouriteTeam = payload;
    },
    getFavouriteTeamFail: (state, { payload }) => {
      state.favouriteLoader = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFail,
  getProfileStart,
  getProfileSuccess,
  getProfileFail,
  getFavouriteTeamStart,
  getFavouriteTeamSuccess,
  getFavouriteTeamFail
} = updateProfileSlice.actions;

export const updateProfileReducer = updateProfileSlice.reducer;
