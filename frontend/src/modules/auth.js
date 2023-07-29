import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import authAPI from '../lib/api/auth';

//로그인, 회원가입 상태관리

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CLEAR_AUTH = 'auth/CLEAR_AUTH';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

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

export const clearAuth = createAction(CLEAR_AUTH);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
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
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [CLEAR_AUTH]: state => ({
      ...state,
      authError: null,
      auth: null,
    }),
  },
  initialState,
);

export default auth;
