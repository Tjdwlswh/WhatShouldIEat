import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as reviewAPI from '../lib/api/reviews';
import { takeLatest } from 'redux-saga/effects';

const [READ_REVIEW, READ_REVIEW_SUCCESS, READ_REVIEW_FAILURE] =
  createRequestActionTypes('review/READ_REVIEW');

const [READ_RECIPE_REVIEW, READ_RECIPE_REVIEW_SUCCESS, READ_RECIPE_REVIEW_FAILURE] =
  createRequestActionTypes('review/READ_RECIPE_REVIEW');

const [WRITE_REVIEW, WRITE_REVIEW_SUCCESS, WRITE_REVIEW_FAILURE] =
  createRequestActionTypes('review/WRITE_REVIEW');

const [DELETE_REVIEW, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE] =
  createRequestActionTypes('review/DELETE_REVIEW');

const CHANGE_COMMENT = 'review/CHANGE_COMMENT';

const UNLOAD_REVIEW = 'review/UNLOAD_REVIEW';

export const readReview = createAction(READ_REVIEW, ({ token, page }) => ({
  token,
  page,
}));

export const readMyRecipeReview = createAction(READ_RECIPE_REVIEW, ({ token, page }) => ({
  token,
  page,
}));

export const writeReview = createAction(
  WRITE_REVIEW,
  ({ token, recipeId, recipeUserId, comment }) => ({
    token,
    recipeId,
    recipeUserId,
    comment,
  }),
);

export const deleteReview = createAction(DELETE_REVIEW, ({ token, recipeId, commentId }) => ({
  token,
  recipeId,
  commentId,
}));

export const unloadReview = createAction(UNLOAD_REVIEW);

export const changeComment = createAction(CHANGE_COMMENT, comment => comment);

const readReviewSaga = createRequestSaga(READ_REVIEW, reviewAPI.readReview);
const readMyRecipeReviewSaga = createRequestSaga(READ_RECIPE_REVIEW, reviewAPI.readMyRecipeReview);
const writeReviewSaga = createRequestSaga(WRITE_REVIEW, reviewAPI.writeReview);
const deleteReviewSaga = createRequestSaga(DELETE_REVIEW, reviewAPI.deleteReview);

export function* reviewSaga() {
  yield takeLatest(READ_REVIEW, readReviewSaga);
  yield takeLatest(READ_RECIPE_REVIEW, readMyRecipeReviewSaga);
  yield takeLatest(WRITE_REVIEW, writeReviewSaga);
  yield takeLatest(DELETE_REVIEW, deleteReviewSaga);
}

const initialState = {
  myReviews: null,
  myRecipeReviews: null,
  commentInfo: null,
  error: null,
  comment: null,
};

const review = handleActions(
  {
    [READ_REVIEW_SUCCESS]: (state, { payload: myReviews }) => ({
      ...state,
      myReviews,
      error: null,
    }),
    [READ_REVIEW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_RECIPE_REVIEW_SUCCESS]: (state, { payload: myRecipeReviews }) => ({
      ...state,
      myRecipeReviews,
      error: null,
    }),
    [READ_RECIPE_REVIEW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [WRITE_REVIEW_SUCCESS]: (state, { payload: commentInfo }) => ({
      ...state,
      commentInfo,
      error: null,
    }),
    [WRITE_REVIEW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [DELETE_REVIEW_SUCCESS]: (state, { payload: commentInfo }) => ({
      ...state,
      commentInfo,
      error: null,
    }),
    [DELETE_REVIEW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_COMMENT]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    [UNLOAD_REVIEW]: () => initialState,
  },
  initialState,
);

export default review;
