import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  availabilityLoader: false,
  teamNameAvailability: null,
  createTeam: null,
  deleteTeam: null,
  errorMsg: ''
};

const createTeamSlice = createSlice({
  name: 'createTeam',
  initialState,
  reducers: {
    createTeamStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    createTeamSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.createTeam = payload;
    },
    createTeamFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    teamNameAvailabilityStart: (state) => {
      state.availabilityLoader = true;
      state.errorMsg = '';
    },
    teamNameAvailabilitySuccess: (state, { payload }) => {
      state.availabilityLoader = false;
      state.teamNameAvailability = payload?.items[0]?.available;
    },
    teamNameAvailabilityFail: (state, { payload }) => {
      state.availabilityLoader = false;
      state.teamNameAvailability = false;
      state.errorMsg = payload;
    },
    resetteamNameAvailability: (state) => {
      state.availabilityLoader = false;
      state.teamNameAvailability = null;
    },
    deleteTeamStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    deleteTeamSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.deleteTeam = payload;
    },
    deleteTeamFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  createTeamStart,
  createTeamSuccess,
  createTeamFail,
  teamNameAvailabilityStart,
  teamNameAvailabilitySuccess,
  teamNameAvailabilityFail,
  resetteamNameAvailability,
  deleteTeamStart,
  deleteTeamSuccess,
  deleteTeamFail
} = createTeamSlice.actions;

export const createTeamReducer = createTeamSlice.reducer;
