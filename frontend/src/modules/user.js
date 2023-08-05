import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import authAPI from '../lib/api/auth';
import { createRequestActionTypes } from '../lib/createRequestSaga';
import { Cookies } from 'react-cookie';

// const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침이후 임시로그인처리
// const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const cookies = new Cookies();

const SET_TOKEN = 'user/SET_TOKEN';
const [GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE] = createRequestActionTypes('user/GET_USER');
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('user/LOGOUT');

// export const check = createAction(CHECK);
export const logout = createAction(LOGOUT, token => token);

export const clearUser = createAction(LOGOUT_SUCCESS);
// ###
export const setToken = createAction(SET_TOKEN, token => token);

export const getUser = createAction(GET_USER, token => token);

// const checkSaga = createRequestSaga(CHECK, authAPI.check);

// function checkFailureSaga() {
//   try {
//     localStorage.removeItem('user');
//   } catch (e) {
//     console.log('localStorage is not working');
//   }
// }

function* logoutSaga(action) {
  try {
    yield call(authAPI.logout, action.payload);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOGOUT_FAILURE, payload: err.toString() });
  }
}

function* logoutFailureSaga(action) {
  try {
    yield call(authAPI.refresh);
    const renewToken = cookies.get('token');
    yield call(authAPI.logout, renewToken);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: LOGOUT_SUCCESS });
  }
}

function* getUserSaga(action) {
  try {
    const response = yield call(authAPI.getUser, action.payload); // authAPI.getUser.getUser에 토큰을 전달
    yield put({ type: GET_USER_SUCCESS, payload: response.data }); // 성공 액션을 디스패치
  } catch (error) {
    // if (error.response.data.error === 'TokenExpiredError: jwt expired') {
    yield put({ type: GET_USER_FAILURE, payload: error.toString() }); // 에러 액션을 디스패치
    // } else {
    //   console.log('회원정보 불러오기 실패');
    // }
  }
}

function* getUserFailureSaga(action) {
  try {
    yield call(authAPI.refresh);
    const renewToken = cookies.get('token');
    yield put(setToken(renewToken));
    if (renewToken) yield put(getUser(renewToken));
  } catch (error) {
    yield put(logout());
  }
}

export function* userSaga() {
  // yield takeLatest(CHECK, checkSaga);
  // yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(GET_USER, getUserSaga); // GET_USER 액션을 감지하여 getUserSaga를 실행
  yield takeLatest(GET_USER_FAILURE, getUserFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(LOGOUT_FAILURE, logoutFailureSaga);
}

const initialState = {
  user: null,
  checkError: null,
  token: null,
};

const user = handleActions(
  {
    [SET_TOKEN]: (state, { payload: token }) => ({
      ...state,
      token,
    }),
    // [CHECK_SUCCESS]: (state, { payload: user }) => ({
    //   ...state,
    //   user,
    //   checkError: null,
    // }),
    // [CHECK_FAILURE]: (state, { payload: error }) => ({
    //   ...state,
    //   user: null,
    //   checkError: error,
    // }),
    [GET_USER_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [GET_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT_SUCCESS]: state => ({
      user: null,
      token: null,
    }),
  },
  initialState,
);

export default user;
