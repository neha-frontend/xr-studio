import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import {
  GET_ALL_TEAM_URL,
  GET_CREATE_TEAM_URL,
  JOIN_USING_EMAIL,
  JOIN_USING_LINK_URL
} from '../../../apis';

import { errorHandler } from '../../../utils';
import {
  createTeamFail,
  createTeamStart,
  createTeamSuccess,
  deleteTeamFail,
  deleteTeamStart,
  deleteTeamSuccess,
  teamNameAvailabilityFail,
  teamNameAvailabilityStart,
  teamNameAvailabilitySuccess
} from '../../reducer/myTeam/createTeamSlice';
import {
  addToFavouriteFail,
  addToFavouriteStart,
  addToFavouriteSuccess,
  removeFromFavouriteFail,
  removeFromFavouriteStart,
  removeFromFavouriteSuccess
} from '../../reducer/myTeam/favouriteTeamSlice';
import {
  getAllTeamFail,
  getListofMembersFail,
  getListofMembersStart,
  getListofMembersSuccess,
  getAllTeamStart,
  getAllTeamSuccess,
  updateTeamDetailFail,
  updateTeamDetailStart,
  updateTeamDetailSuccess
} from '../../reducer/myTeam/myTeamSlice';
import {
  getTeamDetailFail,
  getTeamDetailStart,
  getTeamDetailSuccess,
  getTeamMembersFail,
  getTeamMembersStart,
  getTeamMembersSuccess,
  inviteMemberFail,
  inviteMemberStart,
  inviteMemberSuccess,
  removeMemberFail,
  removeMemberStart,
  removeMemberSuccess,
  setCollabList,
  setUserRole,
  updateMemberRoleFail,
  updateMemberRoleStart,
  updateMemberRoleSuccess
} from '../../reducer/myTeam/teamDetailSlice';
import {
  commonReducerFail,
  commonReducerStart,
  commonReducerSuccess,
  getAllTeamAction,
  getFavouriteTeamAction,
  getTeamDetailAction,
  getTeamMemberAction
} from '../../sagaActions';

//GET MY TEAM LIST
export function* getAllTeamSaga(action) {
  yield put(getAllTeamStart({ isNew: action?.payload?.isNew }));
  const { URL = '', isNew = false } = action.payload;
  yield errorHandler({
    endpoint: `${GET_ALL_TEAM_URL}?${URL}`,
    successHandler: yield function* (response) {
      yield put(getAllTeamSuccess({ data: response.data, isNew }));
    },
    failHandler: getAllTeamFail,
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//CREATE NEW TEAM
export function* createTeamSaga(action) {
  yield put(createTeamStart());
  const { orgId, data, handleInvite } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams`,
    successHandler: yield function* (response) {
      const orgId = response?.data?.items[0]?._organization;
      const teamId = response?.data?.items[0]?._id;
      const name = response?.data?.items[0]?.name;
      yield put(createTeamSuccess(response?.data));
      yield put(
        getAllTeamAction({
          URL: 'startIndex=1&itemsPerPage=10',
          isNew: true,
          startIndex: 1,
          limit: 10
        })
      );
      handleInvite(orgId, teamId, name);
      toast.success(response?.data?.message);
    },
    failHandler: yield function* (response) {
      yield put(createTeamFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    payload: data,
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//CHECK TEAMNAME AVAILABILITY
export function* teamNameAvailabilitySaga(action) {
  yield put(teamNameAvailabilityStart());
  const { orgId, teamName } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/availability-check?name=${teamName}`,
    successHandler: yield function* (response) {
      yield put(teamNameAvailabilitySuccess(response?.data));
    },
    failHandler: teamNameAvailabilityFail,
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//GET LIST OF MEMBERS IN A TEAM
export function* getAllTeamMembersSaga(action) {
  yield put(getListofMembersStart());
  const { orgId, teamId } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/members`,
    successHandler: yield function* (response) {
      yield put(getListofMembersSuccess(response?.data));
    },
    failHandler: getListofMembersFail,
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//DELETE TEAM
export function* deleteTeamSaga(action) {
  yield put(deleteTeamStart());
  const { orgId, teamId, hideModal, redirect, myTeam } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}`,
    successHandler: yield function* (response) {
      yield put(deleteTeamSuccess(response?.data));
      toast.success(response?.data?.message);
      hideModal();
      if (redirect) myTeam();
      yield put(
        getAllTeamAction({
          URL: 'startIndex=1&itemsPerPage=10',
          isNew: true,
          startIndex: 1,
          limit: 10
        })
      );
    },
    failHandler: deleteTeamFail,
    apiType: 'delete',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//UPDATE TEAM
export function* updateTeamSaga(action) {
  yield put(updateTeamDetailStart());

  const { orgId, teamId, hideModal, data } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}`,
    successHandler: yield function* (response) {
      yield put(updateTeamDetailSuccess(response?.data));
      hideModal();
      yield put(
        getAllTeamAction({
          URL: 'startIndex=1&itemsPerPage=10',
          isNew: true,
          startIndex: 1,
          limit: 10
        })
      );
      yield put(getTeamDetailAction({ orgId: orgId, teamId: teamId }));
      toast.success(response?.data?.message);
    },
    failHandler: updateTeamDetailFail,
    apiType: 'patch',
    payload: data,
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//GET TEAM Details
export function* getTeamDetailSaga(action) {
  yield put(getTeamDetailStart());
  const { orgId, teamId } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}`,
    successHandler: yield function* (response) {
      yield put(getTeamDetailSuccess(response?.data));
    },
    failHandler: getTeamDetailFail,
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//GET TEAM MEMBERS
export function* getTeamMembersSaga(action) {
  yield put(getTeamMembersStart({ isNew: action?.payload?.isNew }));
  const { URL = '', isNew = false, orgId, teamId } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/members?${URL}`,
    successHandler: yield function* (response) {
      yield put(getTeamMembersSuccess({ data: response.data, isNew }));
    },
    failHandler: getTeamMembersFail,
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//UPDATE MEMBER ROLE
export function* updateMemberRoleSaga(action) {
  yield put(updateMemberRoleStart());
  const { orgId, teamId, memberId, data, updateMemberRole } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/members/${memberId}`,
    successHandler: yield function* (response) {
      yield put(updateMemberRoleSuccess(response?.data));
      toast.success(response?.data?.message);
      updateMemberRole(data?.role);
    },
    failHandler: yield function* (response) {
      yield put(updateMemberRoleFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'patch',
    payload: data,
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//INVITE MEMBER
export function* inviteMemberSaga(action) {
  yield put(inviteMemberStart());
  const { orgId, teamId, data, hideModal } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/invites`,
    successHandler: yield function* (response) {
      yield put(inviteMemberSuccess(response?.data));
      toast.success(response?.data?.message);
      hideModal();
      yield put(
        getTeamMemberAction({ URL: 'startIndex=1&itemsPerPage=10', isNew: true, orgId, teamId })
      );
    },
    failHandler: yield function* (response) {
      yield put(inviteMemberFail(response));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    payload: data,
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//DELETE MEMBER
export function* removeMemberSaga(action) {
  yield put(removeMemberStart());
  const { orgId, teamId, memberId, data } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/members/${memberId}`,
    successHandler: yield function* (response) {
      yield put(removeMemberSuccess(response?.data));
      toast.success(response?.data?.message);
      yield put(
        getTeamMemberAction({ URL: 'startIndex=1&itemsPerPage=10', isNew: true, orgId, teamId })
      );
    },
    failHandler: yield function* (response) {
      yield put(removeMemberFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'delete',
    payload: data,
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//ADD TO FAVOURITE (TEAM)
export function* addToFavouriteSaga(action) {
  yield put(addToFavouriteStart());
  const { orgId, teamId, updateLike } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/favorite`,
    successHandler: yield function* (response) {
      yield put(addToFavouriteSuccess(response?.data));
      toast.success(response?.data?.message);
      updateLike(true);
      yield put(getFavouriteTeamAction());
    },
    failHandler: yield function* (response) {
      yield put(addToFavouriteFail(response.error));
      toast.error(response?.error?.message);
      updateLike(false);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//REMOVE FROM FAVOURITE (TEAM)
export function* removeFromFavouriteSaga(action) {
  yield put(removeFromFavouriteStart());
  const { orgId, teamId, updateLike } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/favorite`,
    successHandler: yield function* (response) {
      yield put(removeFromFavouriteSuccess(response?.data));
      toast.success(response?.data?.message);
      updateLike(false);
      yield put(getFavouriteTeamAction());
    },
    failHandler: yield function* (response) {
      yield put(removeFromFavouriteFail(response.error));
      toast.error(response?.error?.message);
      updateLike(true);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'delete',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//Join team using link
export function* joinTeamUsingLinkSaga(action) {
  yield put(commonReducerStart());
  const { data } = action.payload;
  yield errorHandler({
    endpoint: JOIN_USING_LINK_URL,
    successHandler: yield function* (response) {
      yield put(commonReducerSuccess(response?.data));
      toast.success(response?.data?.message);
      yield put(
        getAllTeamAction({
          URL: 'startIndex=1&itemsPerPage=10',
          isNew: true,
          startIndex: 1,
          limit: 10
        })
      );
    },
    failHandler: yield function* (response) {
      yield put(commonReducerFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    payload: data,
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//Join team by Email
export function* joinTeamByEmailSaga(action) {
  yield put(commonReducerStart());
  const { invitationId, status } = action.payload;
  yield errorHandler({
    endpoint: `${JOIN_USING_EMAIL}/${invitationId}/${status}`,
    successHandler: yield function* (response) {
      yield put(commonReducerSuccess(response?.data));
      toast.success(response?.data?.message);
      yield put(
        getAllTeamAction({
          URL: 'startIndex=1&itemsPerPage=10',
          isNew: true,
          startIndex: 1,
          limit: 10
        })
      );
    },
    failHandler: yield function* (response) {
      yield put(commonReducerFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'patch',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//SET JOIN BY LINK ROLE
export function* setJoinByLinkRoleSaga(action) {
  yield put(commonReducerStart());
  const { orgId, teamId, data, showResponse } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}`,
    successHandler: yield function* (response) {
      yield put(commonReducerSuccess(response?.data));
      if (showResponse) toast.success(response?.data?.message);
    },
    failHandler: yield function* (response) {
      yield put(commonReducerFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'patch',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//GET USER ROLE
export function* getuserRoleSaga(action) {
  yield put(commonReducerStart());
  const { orgId, teamId } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/members/my-membership-details`,
    successHandler: yield function* (response) {
      yield put(commonReducerSuccess(response?.data));
      yield put(setUserRole(response?.data?.items[0]?.role));
    },
    failHandler: yield function* (response) {
      yield put(commonReducerFail(response.error));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//TRANSFER OWNERSHIP ROLE
export function* transferOwnershipSaga(action) {
  yield put(commonReducerStart());
  const { orgId, teamId, data } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/ownership-transfer`,
    successHandler: yield function* (response) {
      yield put(commonReducerSuccess(response?.data));
      toast.success(response?.data?.message);
      yield put(setUserRole('editor'));
      yield put(
        getTeamMemberAction({ URL: 'startIndex=1&itemsPerPage=10', isNew: true, orgId, teamId })
      );
    },
    failHandler: yield function* (response) {
      yield put(commonReducerFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//Get Collab List
export function* getTeamCollaboratorSaga(action) {
  yield put(commonReducerStart());
  const { orgId, teamId } = action.payload;
  yield errorHandler({
    endpoint: `${GET_CREATE_TEAM_URL}/${orgId}/teams/${teamId}/members`,
    successHandler: yield function* (response) {
      yield put(commonReducerSuccess(response?.data));
      yield put(setCollabList(response?.data));
    },
    failHandler: yield function* (response) {
      yield put(commonReducerFail(response.error));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}
