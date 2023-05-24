import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  teamDetail: null,
  teamMemberLoader: false,
  teamMembers: null,
  updateRoleLoader: false,
  updateRole: null,
  inviteLoader: false,
  invite: null,
  userRole: '',
  errorMsg: '',
  collaborator: null
};

const teamDetailSlice = createSlice({
  name: 'teamDetail',
  initialState,
  reducers: {
    getTeamDetailStart: (state) => {
      state.isLoading = true;
      state.errorMsg = '';
      state.teamDetail = null;
    },
    getTeamDetailSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.teamDetail = payload.items[0];
    },
    getTeamDetailFail: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    getTeamMembersStart: (state, { payload }) => {
      if (payload.isNew) state.teamMemberLoader = true;
      state.errorMsg = '';
    },
    getTeamMembersSuccess: (state, { payload }) => {
      const { data, isNew } = payload;
      state.teamMemberLoader = false;

      const hasMore =
        data.totalItems !==
        (isNew ? data.items.length : state.teamMembers.list.length + data.items.length);

      state.teamMembers = isNew
        ? {
            list: data?.items?.map((item) => ({
              ...item
            })),
            startIndex: data?.startIndex,
            hasMore
          }
        : {
            list: [
              ...state.teamMembers.list,
              ...data.items.map((item) => ({
                ...item
              }))
            ],
            startIndex: data?.startIndex,
            hasMore
          };
    },
    getTeamMembersFail: (state, { payload }) => {
      state.teamMemberLoader = false;
      state.errorMsg = payload;
    },
    updateMemberRoleStart: (state) => {
      state.updateRoleLoader = true;
      state.errorMsg = '';
    },
    updateMemberRoleSuccess: (state, { payload }) => {
      state.updateRoleLoader = false;
      state.updateRole = payload.items;
    },
    updateMemberRoleFail: (state, { payload }) => {
      state.updateRoleLoader = false;
      state.errorMsg = payload;
    },
    inviteMemberStart: (state) => {
      state.inviteLoader = true;
      state.errorMsg = '';
    },
    inviteMemberSuccess: (state, { payload }) => {
      state.inviteLoader = false;
      state.invite = payload.items;
    },
    inviteMemberFail: (state, { payload }) => {
      state.inviteLoader = false;
      state.errorMsg = payload;
    },
    removeMemberStart: (state) => {
      state.inviteLoader = true;
      state.errorMsg = '';
    },
    removeMemberSuccess: (state, { payload }) => {
      state.inviteLoader = false;
      state.invite = payload.items;
    },
    removeMemberFail: (state, { payload }) => {
      state.inviteLoader = false;
      state.errorMsg = payload;
    },
    setUserRole: (state, { payload }) => {
      state.userRole = payload;
    },
    setCollabList: (state,{payload}) => {
      state.collaborator = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  getTeamDetailStart,
  getTeamDetailSuccess,
  getTeamDetailFail,
  getTeamMembersStart,
  getTeamMembersSuccess,
  getTeamMembersFail,
  updateMemberRoleStart,
  updateMemberRoleSuccess,
  updateMemberRoleFail,
  inviteMemberStart,
  inviteMemberSuccess,
  inviteMemberFail,
  removeMemberStart,
  removeMemberSuccess,
  removeMemberFail,
  setUserRole,
  setCollabList
} = teamDetailSlice.actions;

export const teamDetailReducer = teamDetailSlice.reducer;
