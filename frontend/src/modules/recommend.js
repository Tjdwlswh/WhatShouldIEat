import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [LIST_RECOMMEND, LIST_RECOMMEND_SUCCESS, LIST_RECOMMEND_FAILURE] =
  createRequestActionTypes('posts/LIST_RECOMMEND');

export const recommendPosts = createAction(LIST_RECOMMEND, ({ token, userId, tag, page }) => ({
  token,
  userId,
  tag,
  page,
}));

const listrecommendSaga = createRequestSaga(LIST_RECOMMEND, postsAPI.recommendPosts);

export function* recommendSaga() {
  yield takeLatest(LIST_RECOMMEND, listrecommendSaga);
}

const initialState = {
  posts: null,
  error: null,
  totalItemsCount: null,
};

const recommend = handleActions(
  {
    [LIST_RECOMMEND_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts: posts.recipes,
      totalItemsCount: posts.totalItemsCount,
      error: null,
    }),
    [LIST_RECOMMEND_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default recommend;
