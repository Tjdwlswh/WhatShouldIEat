import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'create/CHANGE_FIELD';
const [CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE] =
  createRequestActionTypes('create/CREATE_POST');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const createPost = createAction(CREATE_POST, ({ tags }) => ({
  tags,
}));

const createPostSaga = createRequestSaga(CREATE_POST, postsAPI.createPost);
export function* createSaga() {
  yield takeLatest(CREATE_POST, createPostSaga);
}

const initialState = {
  tags: [],
  post: null,
  postError: null,
};

const create = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [CREATE_POST]: state => ({
      ...state,
      //초기화시키기
      post: null,
      postError: null,
    }),
    [CREATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [CREATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
);

export default create;
