import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  favouriteTeam: null,
  errorMsg: ''
};

const favouriteTeamSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavouriteStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    addToFavouriteSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.favouriteTeam = payload;
    },
    addToFavouriteFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    removeFromFavouriteStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    removeFromFavouriteSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.favouriteTeam = payload;
    },
    removeFromFavouriteFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addToFavouriteStart,
  addToFavouriteSuccess,
  addToFavouriteFail,
  removeFromFavouriteStart,
  removeFromFavouriteSuccess,
  removeFromFavouriteFail
} = favouriteTeamSlice.actions;

export const favouriteTeamReducer = favouriteTeamSlice.reducer;
