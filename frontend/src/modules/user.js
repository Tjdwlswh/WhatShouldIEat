import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';

// const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침이후 임시로그인처리
// const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');

const LOGOUT = 'user/LOGOUT';
const SET_TOKEN = 'user/SET_TOKEN';

// export const tempSetUser = createAction(TEMP_SET_USER, user => user);
// export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
// ###
export const setToken = createAction(SET_TOKEN, token => token);

// const checkSaga = createRequestSaga(CHECK, authAPI.check);

// function checkFailureSaga() {
//   try {
//     localStorage.removeItem('user');
//   } catch (e) {
//     console.log('localStorage is not working');
//   }
// }

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
  } catch (e) {
    // console.log('localStorage is not working');
    console.log(e);
  }
}

export function* userSaga() {
  // yield takeLatest(CHECK, checkSaga);
  // yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

//쿠키를 확인해서 백엔드 로그인을 쿠키를 보내주는걸로 처리를 한다. 그 쿠키 가지고 user api 를 호출
//check 를 호출하기 전에 쿠키를 불러오는 함수 로그인하면 백엔드에서 쿠키를 보내고 api를 비동기로 처리?

const initialState = {
  user: null,
  token: null,
};

const user = handleActions(
  {
    [SET_TOKEN]: (state, { payload: token }) => ({
      ...state,
      token,
    }),
    // [TEMP_SET_USER]: (state, { payload: user }) => ({
    //   ...state,
    //   user,
    // }),
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
    [LOGOUT]: state => ({
      ...state,
      user: null,
      token: null,
    }),
  },
  initialState,
);

export default user;
