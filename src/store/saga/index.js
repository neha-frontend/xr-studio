import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  addToFavouriteAction,
  checkAvailability,
  createTeamAction,
  deleteTeamAction,
  getAllTeamAction,
  getAllTeamMembersAction,
  getFavouriteTeamAction,
  getProfileAction,
  getTeamCollaboratorAction,
  getTeamDetailAction,
  getTeamMemberAction,
  getuserRoleAction,
  inviteMemberAction,
  joinTeamByEmailAction,
  joinTeamUsingLinkAction,
  loginAction,
  logoutAction,
  removeFromFavouriteAction,
  removeMemberAction,
  resetPasswordAction,
  sendOtpAction,
  setJoinByLinkRoleAction,
  signUpAction,
  socialSignUpAction,
  teamNameAvailabilityAction,
  transferOwnershipAction,
  updateMemberRoleAction,
  updatePasswordAction,
  updateProfileAction,
  updateSettingAction,
  updateTeamAction,
  verifyOtpAction
} from '../sagaActions';

import {
  availabilityCheckSaga,
  loginSaga,
  logoutSaga,
  resetPasswordSaga,
  sendOtpSaga,
  signUpSaga,
  socialSignUpSaga,
  verifyOtpSaga
} from './auth/auth';

import {
  getFavouriteTeamSaga,
  getProfileSaga,
  updatePasswordSaga,
  updateProfileSaga,
  updateSettingSaga
} from './profile/profile';

import {
  addToFavouriteSaga,
  createTeamSaga,
  deleteTeamSaga,
  getAllTeamMembersSaga,
  getAllTeamSaga,
  getTeamCollaboratorSaga,
  getTeamDetailSaga,
  getTeamMembersSaga,
  getuserRoleSaga,
  inviteMemberSaga,
  joinTeamByEmailSaga,
  joinTeamUsingLinkSaga,
  removeFromFavouriteSaga,
  removeMemberSaga,
  setJoinByLinkRoleSaga,
  teamNameAvailabilitySaga,
  transferOwnershipSaga,
  updateMemberRoleSaga,
  updateTeamSaga
} from './myTeam/myTeam';

function* watchAuthentication() {
  yield takeLatest(checkAvailability.type, availabilityCheckSaga);
  yield takeLatest(signUpAction.type, signUpSaga);
  yield takeLatest(sendOtpAction.type, sendOtpSaga);
  yield takeLatest(verifyOtpAction.type, verifyOtpSaga);
  yield takeLatest(resetPasswordAction.type, resetPasswordSaga);
  yield takeLatest(loginAction.type, loginSaga);
  yield takeLatest(logoutAction.type, logoutSaga);
  yield takeLatest(socialSignUpAction.type, socialSignUpSaga);
}

function* watchProfile() {
  yield takeLatest(updateProfileAction.type, updateProfileSaga);
  yield takeLatest(getProfileAction.type, getProfileSaga);
  yield takeLatest(updateSettingAction.type, updateSettingSaga);
  yield takeLatest(updatePasswordAction.type, updatePasswordSaga);
  yield takeLatest(getFavouriteTeamAction.type, getFavouriteTeamSaga);
}

function* watchTeam() {
  yield takeLatest(getAllTeamAction.type, getAllTeamSaga);
  yield takeLatest(createTeamAction.type, createTeamSaga);
  yield takeLatest(teamNameAvailabilityAction.type, teamNameAvailabilitySaga);
  yield takeEvery(getAllTeamMembersAction.type, getAllTeamMembersSaga);
  yield takeLatest(deleteTeamAction.type, deleteTeamSaga);
  yield takeLatest(updateTeamAction.type, updateTeamSaga);
  yield takeLatest(getTeamDetailAction.type, getTeamDetailSaga);
  yield takeLatest(getTeamMemberAction.type, getTeamMembersSaga);
  yield takeLatest(updateMemberRoleAction.type, updateMemberRoleSaga);
  yield takeLatest(inviteMemberAction.type, inviteMemberSaga);
  yield takeLatest(removeMemberAction.type, removeMemberSaga);
  yield takeLatest(addToFavouriteAction.type, addToFavouriteSaga);
  yield takeLatest(removeFromFavouriteAction.type, removeFromFavouriteSaga);
  yield takeLatest(joinTeamUsingLinkAction.type, joinTeamUsingLinkSaga);
  yield takeLatest(joinTeamByEmailAction.type, joinTeamByEmailSaga);
  yield takeLatest(setJoinByLinkRoleAction.type, setJoinByLinkRoleSaga);
  yield takeLatest(getuserRoleAction.type, getuserRoleSaga);
  yield takeLatest(transferOwnershipAction.type,transferOwnershipSaga);
  yield takeLatest(getTeamCollaboratorAction.type, getTeamCollaboratorSaga);
}

export default function* rootSaga() {
  yield all([watchAuthentication(), watchProfile(), watchTeam()]);
}
