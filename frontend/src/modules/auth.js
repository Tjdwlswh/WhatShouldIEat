import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import authAPI from '../lib/api/auth';

//로그인, 회원가입 상태관리

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

const [RENEW, RENEW_SUCCESS, RENEW_FAILURE] = createRequestActionTypes('auth/RENEW');

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form, //register 에서 오는 form or login에서 오는 form
  key, // input의 name
  value, //input의 value
}));

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
//register or login

export const register = createAction(REGISTER, ({ email, password, nickName }) => ({
  email,
  password,
  nickName,
}));

export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));

export const renew = createAction(RENEW, ({ password, nickName, image, token }) => ({
  password,
  nickName,
  image,
  token,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const renewSaga = createRequestSaga(RENEW, authAPI.renew);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(RENEW, renewSaga);
}

const initialState = {
  register: {
    email: '',
    password: '',
    passwordConfirm: '',
    nickName: '',
  },
  login: {
    email: '',
    password: '',
  },
  renew: {
    email: '',
    password: '',
    passwordConfirm: '',
    nickName: '',
    message: '',
    provider: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      auth: null,
      authError: null,
      [form]: initialState[form],
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => {
      localStorage.setItem('isLoggedIn', true);
      return {
        ...state,
        authError: null,
        auth,
      };
    },
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [RENEW_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      renew: {
        ...state.renew,
        message: auth.message,
      },
    }),
    [RENEW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
