import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

//로그인, 회원가입 상태관리

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form, //register 에서 오는 form or login에서 오는 form
  key, // input의 name
  value, //input의 value
}));

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
//register or login

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
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
  },
  initialState,
);

export default auth;
