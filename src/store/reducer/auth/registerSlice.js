import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  registerData: null,
  availabilityLoader : false,
  availability : null,
  authToken : '',
  errorMsg: ''
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    registerSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.registerData = payload;
      state.authToken = payload.token;
    },
    registerFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetRegisterErrorMsg: (state) => {
      state.errorMsg = '';
    },
    availabilityCheckStart: (state) => {
      state.availabilityLoader = true;
      state.errorMsg = '';
    },
    availabilityCheckSuccess: (state, { payload }) => {
      state.availabilityLoader = false;
      state.availability = payload.items[0].available;      
    },
    availabilityCheckFail: (state, { payload }) => {
      state.availabilityLoader = false;
      state.errorMsg = payload;
      state.availability = false; 
    },
    resetAvailabilityCheck: (state) => {
      state.availabilityLoader = false;
      state.availability = null; 
    }    
  }
});

// Action creators are generated for each case reducer function
export const {
  registerStart,
  registerSuccess,
  registerFail,
  resetRegisterErrorMsg,
  availabilityCheckStart,
  availabilityCheckSuccess,
  availabilityCheckFail,
  resetAvailabilityCheck
} = registerSlice.actions;

export const registerReducer = registerSlice.reducer;
