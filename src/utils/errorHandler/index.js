import { put } from 'redux-saga/effects';

import { axios } from '../../http';
import { setBaseUrl } from '../../http/axios/axios_main';

export default function* errorHandler({
  endpoint,
  successHandler,
  failHandler,
  payload = {},
  apiType = '',
  token = '',
  failHandlerType = '',
  sendPayload = false,
  baseUrl = process.env.REACT_APP_END_POINT_URL
}) {
  
  setBaseUrl(baseUrl);

  if (apiType.trim() === '') {
    throw new Error('apiType is require');
  }
  try {
    let response;
    if (token === '') {
      if (apiType === 'get') {
        response = yield axios.get(endpoint);
      } else if (apiType === 'post') {
        response = yield axios.post(endpoint, payload);
      } else if (apiType === 'put') {
        response = yield axios.put(endpoint, payload);
      } else if (apiType === 'delete') {
        if (sendPayload) {
          response = yield axios.delete(endpoint, { data: payload });
        } else {
          response = yield axios.delete(endpoint);
        }
      } else if (apiType === 'patch') {
        response = yield axios.patch(endpoint, payload);
      }
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      if (apiType === 'get') {
        response = yield axios.get(endpoint, config);
      } else if (apiType === 'post') {
        response = yield axios.post(endpoint, payload, config);
      } else if (apiType === 'put') {
        response = yield axios.put(endpoint, payload, config);
      } else if (apiType === 'delete') {
        response = yield axios.delete(endpoint, config);
      } else if (apiType === 'patch') {
        response = yield axios.patch(endpoint, payload, config);
      }
    }
    if (response && (response.status === 200 || response.status === 201) && response.data) {
      yield successHandler(response.data);
    } else if (response !== undefined && response.status !== undefined) {
      if (
        response.data.message !== undefined &&
        response.data.message !== '' &&
        typeof response.data.message === 'string'
      ) {
        yield put(failHandler(response.data.message));
      } else {
        yield put(failHandler('Server error! Please try again.'));
      }
    } else {
      yield put(failHandler('Something went wrong! Please try again.'));
    }
  } catch (error) {
    if (
      error !== undefined &&
      error.response !== undefined &&
      error.response.status !== undefined
    ) {
      if (error.response.status === 500) {
        if (failHandlerType === 'CUSTOM') {
          yield failHandler(error.response.data || error.response.data);
        } else {
          yield put(failHandler(error.response.data.message || error.response.data.msg));
        }
      } else if (error.response.status === 400) {
        if (failHandlerType === 'CUSTOM') {
          yield failHandler(error.response.data);
        } else {
          yield put(failHandler(error.response.data.message));
        }
      } else if (error.response.status === 422) {
        if (failHandlerType === 'CUSTOM') {
          yield failHandler(error.response.data);
        } else {
          yield put(failHandler(error.response.data.message));
        }
      } else if (error.response.status === 403) {        
        if (failHandlerType === 'CUSTOM') {
          yield failHandler(error.response.data.message || error.response.data.msg || error.response.data);
        } else {
          yield put(failHandler(error.response.data.message || error.response.data.msg));
        }
      } else if (error.response.status === 404) {        
        if (failHandlerType === 'CUSTOM') {
          yield failHandler(error.response.data.message || error.response.data.error.message);
        } else {
          yield put(failHandler(error.response.data.message));
        }
      } else if (
        error.response.data &&
        error.response.data.message !== undefined &&
        error.response.data.message !== '' &&
        typeof error.response.data.message === 'string'
      ) {
        if (error.response.data && error.response.data.data && error.response.data.data.type) {
          if (failHandlerType === 'CUSTOM') {
            yield failHandler(error.response.data);
          } else {
            yield put(
              failHandler({
                type: error.response.data.data.type,
                message: error.response.data.message
              })
            );
          }
        } else if (failHandlerType === 'CUSTOM') {
          yield failHandler(error.response.data);
        } else {
          yield failHandler(error.response.data);
        }
      } else if (failHandlerType === 'CUSTOM') {
        yield failHandler(error.response.data);
      } else {
        yield put(failHandler(error.response.data));
      }
    } else if (failHandlerType === 'CUSTOM') {
      yield failHandler('Something went wrong! Please try again.');
    } else {
      yield put(failHandler('Something went wrong! Please try again.'));
    }
  }
}
