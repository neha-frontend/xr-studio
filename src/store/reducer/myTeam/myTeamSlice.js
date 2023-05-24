import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  allTeamList: null,
  errorMsg: '',
  teamMemberLoader: false,
  teamMembers: [],
  teamMemberError: '',
  teamData: null
};

const myTeamSlice = createSlice({
  name: 'myTeam',
  initialState,
  reducers: {
    getAllTeamStart: (state, { payload }) => {
      if (payload.isNew) state.isLoading = true;
      state.errorMsg = '';
    },
    getAllTeamSuccess: (state, { payload }) => {
      const { data, isNew } = payload;
      state.isLoading = false;

      const hasMore =
        data.totalItems !==
        (isNew ? data.items.length : state.allTeamList.list.length + data.items.length);

      state.allTeamList = isNew
        ? {
            list: data?.items,
            startIndex: data?.startIndex,
            hasMore
          }
        : {
            list: [...state.allTeamList.list, ...data.items],
            startIndex: data?.startIndex,
            hasMore
          };
    },
    getAllTeamFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    getListofMembersStart: (state) => {
      state.teamMemberLoader = true;
      state.teamMemberError = '';
    },
    getListofMembersSuccess: (state, { payload }) => {
      state.teamMemberLoader = false;
      state.teamMembers = [...state.teamMembers, payload.items];
    },
    getListofMembersFail: (state, { payload }) => {
      state.teamMemberLoader = false;
      state.teamMemberError = payload;
    },
    updateTeamDetailStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    },
    updateTeamDetailSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.teamData = payload.items;
    },
    updateTeamDetailFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    resetTeamDetails:(state) =>{
      state.allTeamList = null;
      state.teamMembers = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  getAllTeamStart,
  getAllTeamSuccess,
  getAllTeamFail,
  getListofMembersStart,
  getListofMembersSuccess,
  getListofMembersFail,
  updateTeamDetailStart,
  updateTeamDetailSuccess,
  updateTeamDetailFail,
  resetTeamDetails
} = myTeamSlice.actions;

export const myTeamReducer = myTeamSlice.reducer;
