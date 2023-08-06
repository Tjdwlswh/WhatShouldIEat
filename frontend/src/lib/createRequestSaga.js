import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export function createRequestSaga(type, request, message) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    //action은 register(username, password) or login(username, password)
    yield put(startLoading(message));
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
      if (e.response.data.error === 'TokenExpiredError: jwt expired') {
        // yield put(getUser());
        yield put({
          type: 'user/GET_USER_FAILURE',
        });
      }
    }
    yield put(finishLoading());
  };
}
