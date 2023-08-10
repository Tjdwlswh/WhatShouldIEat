import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest, call } from 'redux-saga/effects';

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
  createRequestActionTypes('post/READ_POST');

const UNLOAD_POST = 'post/UNLOAD_POST';

const LIKE_POST = 'post/LIKE_POST';

export const readPost = createAction(READ_POST, ({ recipeId, token }) => ({
  recipeId,
  token,
}));

export const postLike = createAction(LIKE_POST, ({ recipeId, token, like }) => ({
  recipeId,
  token,
  like,
}));

export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);

function* postLikeSage(action) {
  try {
    const response = yield call(postsAPI.postLike, action.payload);
  } catch (error) {
    console.log(error);
  }
}

//토큰도 같이
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(LIKE_POST, postLikeSage);
}

const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      error: null,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;
