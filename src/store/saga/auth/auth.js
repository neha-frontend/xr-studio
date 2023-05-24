import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';

import {
  AVAILABILITY_CHECK,
  FORGET_PASSWORD_URL,
  SEND_OTP_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  SOCIAL_SIGNUP_URL,
  VERIFY_OTP_URL
} from '../../../apis';
import { SHOW_OTP_MODAL } from '../../../constants/modalTypeConstant';
import { errorHandler } from '../../../utils';
import {
  availabilityCheckFail,
  availabilityCheckStart,
  availabilityCheckSuccess,
  loginAction,
  loginFail,
  loginStart,
  loginSuccess,
  logoutAction,
  logoutSuccess,
  registerFail,
  registerStart,
  registerSuccess,
  resetPasswordFail,
  resetPasswordStart,
  resetPasswordSuccess,
  resetTeamDetails,
  sendOtpFail,
  sendOtpStart,
  sendOtpSuccess,
  showCustomModal,
  socialSignUpAction,
  verifyOtpFail,
  verifyOtpStart,
  verifyOtpSuccess
} from '../../sagaActions';

// CHECK USERNAME/EMAIL/PHONE EXIST SAGA
export function* availabilityCheckSaga(action) {
  yield put(availabilityCheckStart());
  const {
    email,
    isEmail,
    phone,
    countryCode,
    isUsername,
    username,
    socialSignup,
    loginData,
    redirect,
    signUpRedirect
  } = action.payload;

  yield errorHandler({
    endpoint: `${AVAILABILITY_CHECK}?${
      isUsername
        ? `username=${username}`
        : isEmail
        ? `email=${email}`
        : `countryCode=${countryCode}&phone=${phone}`
    }`,
    successHandler: yield function* (response) {
      yield put(availabilityCheckSuccess(response.data));
      if (socialSignup) {
        const data = {
          accessToken: loginData.accessToken,
          provider: loginData.provider,
          accountType: 'USER'
        };
        if (response.data.items[0].available)
          yield put(socialSignUpAction({ data: data, signUpRedirect }));
        else yield put(loginAction({ data: loginData, redirect }));
      }
    },
    failHandler: availabilityCheckFail,
    apiType: 'get'
  });
}

//REGISTER SAGA
export function* signUpSaga(action) {
  yield put(registerStart());
  const { data, redirect, timeout } = action.payload;

  yield errorHandler({
    endpoint: `${SIGNUP_URL}`,
    successHandler: yield function* (response) {
      const joinLink = sessionStorage.getItem('joinTeam');
      const authToken = response?.data?.token;
      yield localStorage.setItem('authToken', authToken);
      yield put(registerSuccess(response?.data));
      yield put(loginSuccess({ authToken }));
      toast.success(response?.data?.message);
      if (joinLink) redirect(joinLink);
      else redirect('/');
    },
    failHandler: yield function* (response) {
      yield put(registerFail(response.error));
      toast.error(response?.error?.message);
      if (response?.error?.message === 'This session has expired!') {
        timeout();
      }
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post'
  });
}

// SEND OTP TO USER SAGA
export function* sendOtpSaga(action) {
  yield put(sendOtpStart());
  const { data, updateTimer } = action.payload;

  yield errorHandler({
    endpoint: `${SEND_OTP_URL}`,
    successHandler: yield function* (response) {
      yield put(sendOtpSuccess(response.data));
      yield put(
        showCustomModal({
          customModalType: SHOW_OTP_MODAL
        })
      );
      if (updateTimer) updateTimer(response?.data?.items[0]?.codeVerification?.resendDuration);
    },
    failHandler: yield function* (response) {
      yield put(sendOtpFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post'
  });
}

//VERIFY OTP SAGA
export function* verifyOtpSaga(action) {
  yield put(verifyOtpStart());
  const { data, redirect } = action.payload;

  yield errorHandler({
    endpoint: `${VERIFY_OTP_URL}`,
    successHandler: yield function* (response) {
      yield put(verifyOtpSuccess(response.data));
      toast.success(response?.data?.message);
      redirect();
    },
    failHandler: yield function* (response) {
      yield put(verifyOtpFail(response.error));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post'
  });
}

//RESET PASSWORD SAGA
export function* resetPasswordSaga(action) {
  yield put(resetPasswordStart());
  const { data, hideModal, timeout } = action.payload;

  yield errorHandler({
    endpoint: `${FORGET_PASSWORD_URL}`,
    successHandler: yield function* (response) {
      yield put(resetPasswordSuccess(response.data));
      toast.success(response?.data?.message);
      hideModal();
    },
    failHandler: yield function* (response) {
      yield put(resetPasswordFail(response.error));
      toast.error(response?.error?.message);
      if (response?.error?.message === 'This session has expired!') {
        timeout();
      }
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post'
  });
}

//LOGIN SAGA
export function* loginSaga(action) {
  yield put(loginStart());
  const { data, redirect } = action.payload;

  yield errorHandler({
    endpoint: SIGNIN_URL,
    successHandler: yield function* (response) {
      const authToken = response?.data?.token;
      const hasUsername = response?.data?.items[0].hasUsername;
      const joinLink = sessionStorage.getItem('joinTeam');
      // store authToken in localStorage
      yield localStorage.setItem('authToken', authToken);
      yield put(loginSuccess({ authToken }));
      // toast.success(response?.data?.message);
      if (!hasUsername) {
        yield sessionStorage.setItem('hasUsername', hasUsername);
        redirect('/create-username');
      }
      if (joinLink) redirect(joinLink);
    },
    failHandler: yield function* (response) {
      yield put(loginFail(response?.error?.message));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post'
  });
}

//CHECK AUTH
export function* authenticationValidatorSaga() {
  yield put(loginStart());
  const authToken = yield localStorage.getItem('authToken');
  if (authToken) {
    yield put(loginSuccess({ authToken }));
  } else {
    yield put(logoutAction({ forceLogout: true }));
  }
}

//LOGOUT SAGA
export function* logoutSaga(action) {
  const { login, loginRedirect, forceLogout } = action.payload;
  // const navigate = action?.payload?.navigate;
  if (forceLogout) {
    yield localStorage.clear();
    yield sessionStorage.clear();
    yield put(resetTeamDetails());
    // yield put(hideCustomModal());
    // if (navigate) navigate('/');
    yield put(logoutSuccess());
    if (loginRedirect) {
      login();
    }
  }
  //  else {
  //   yield put(logoutStart());
  //   yield errorHandler({
  //     endpoint: LOGOUT_URL,
  //     successHandler: yield function* () {
  //       // yield put(hideCustomModal());
  //       yield localStorage.removeItem('authToken');
  //       // if (navigate) navigate('/');
  //       yield put(logoutSuccess());
  //     },
  //     failHandler: yield function* (response) {
  //       yield put(logoutFail(response));
  //     },
  //     failHandlerType: 'CUSTOM',
  //     apiType: 'post'
  //   });
  // }
}

//SOCIAL SIGNUP
export function* socialSignUpSaga(action) {
  yield put(registerStart());
  const { data, signUpRedirect } = action.payload;

  yield errorHandler({
    endpoint: SOCIAL_SIGNUP_URL,
    successHandler: yield function* (response) {
      const authToken = response?.data?.token;
      // store authToken in localStorage
      yield localStorage.setItem('authToken', authToken);
      yield put(registerSuccess(response.data));
      yield put(loginSuccess({ authToken }));
      toast.success(response?.data?.message);
      signUpRedirect();
    },
    failHandler: yield function* (response) {
      yield put(loginFail(response?.error?.message));
      toast.error(response?.error?.message);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post'
  });
}
