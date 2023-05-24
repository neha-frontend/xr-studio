import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import {
  GET_FAVOURITE_TEAM_URL,
  UPDATE_PASSWORD_URL,
  UPDATE_PROFILE_URL,
  UPDATE_SETTING_URL
} from '../../../apis';

import { errorHandler } from '../../../utils';
import {
  updatePasswordFail,
  updatePasswordStart,
  updatePasswordSuccess,
  updateSettingFail,
  updateSettingStart,
  updateSettingSuccess
} from '../../reducer/profile/settingSlice';
import {
  getFavouriteTeamFail,
  getFavouriteTeamStart,
  getFavouriteTeamSuccess,
  getProfileFail,
  getProfileStart,
  getProfileSuccess,
  updateProfileFail,
  updateProfileStart,
  updateProfileSuccess
} from '../../sagaActions';

//UPDATE PROFILE SAGA
export function* updateProfileSaga(action) {
  yield put(updateProfileStart());
  const { data, redirect, updateUsername } = action.payload;

  yield errorHandler({
    endpoint: `${UPDATE_PROFILE_URL}`,
    successHandler: yield function* (response) {
      yield put(updateProfileSuccess(response?.data));
      if (updateUsername) {
        toast.success('Login Successful');
        sessionStorage.setItem('hasUsername', true);
      } else toast.success(response?.data?.message);
      redirect();
    },
    failHandler: yield function* (response) {
      yield put(updateProfileFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'patch'
  });
}

//GET PROFILE SAGA
export function* getProfileSaga() {
  yield put(getProfileStart());
  yield errorHandler({
    endpoint: `${UPDATE_PROFILE_URL}`,
    successHandler: yield function* (response) {
      yield put(getProfileSuccess(response?.data?.items[0]));
    },
    failHandler: yield function* (response) {
      yield put(getProfileFail(response.error));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}

//UPDATE PRIVACY SETTING
export function* updateSettingSaga(action) {
  yield put(updateSettingStart());
  const { data, redirect } = action.payload;

  yield errorHandler({
    endpoint: `${UPDATE_SETTING_URL}`,
    successHandler: yield function* (response) {
      yield put(updateSettingSuccess(response?.data));
      toast.success(response?.data?.message);
      redirect();
    },
    failHandler: yield function* (response) {
      yield put(updateSettingFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'patch'
  });
}

//UPDATE PASSWORD
export function* updatePasswordSaga(action) {
  yield put(updatePasswordStart());
  const { data, redirect } = action.payload;

  yield errorHandler({
    endpoint: `${UPDATE_PASSWORD_URL}`,
    successHandler: yield function* (response) {
      yield put(updatePasswordSuccess(response?.data));
      toast.success(response?.data?.message);
      redirect();
    },
    failHandler: yield function* (response) {
      yield put(updatePasswordFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'patch'
  });
}

//GET FAVOURITE TEAM
export function* getFavouriteTeamSaga() {
  yield put(getFavouriteTeamStart());
  yield errorHandler({
    endpoint: `${GET_FAVOURITE_TEAM_URL}?resourceType=Team`,
    successHandler: yield function* (response) {
      yield put(getFavouriteTeamSuccess(response?.data?.items));
    },
    failHandler: yield function* (response) {
      yield put(getFavouriteTeamFail(response.error));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    baseUrl: process.env.REACT_APP_STUDIO_BASE_URL
  });
}
