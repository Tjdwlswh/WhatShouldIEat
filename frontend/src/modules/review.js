import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as reviewAPI from '../lib/api/reviews';
import { takeLatest } from 'redux-saga/effects';

const [READ_REVIEW, READ_REVIEW_SUCCESS, READ_REVIEW_FAILURE] =
  createRequestActionTypes('review/READ_REVIEW');

const [READ_RECIPE_REVIEW, READ_RECIPE_REVIEW_SUCCESS, READ_RECIPE_REVIEW_FAILURE] =
  createRequestActionTypes('review/READ_RECIPE_REVIEW');

const UNLOAD_REVIEW = 'review/UNLOAD_REVIEW';

export const readReview = createAction(READ_REVIEW, ({ token, page }) => ({
  token,
  page,
}));

export const readMyRecipeReview = createAction(READ_RECIPE_REVIEW, ({ token, page }) => ({
  token,
  page,
}));

export const unloadReview = createAction(UNLOAD_REVIEW);

const readReviewSaga = createRequestSaga(READ_REVIEW, reviewAPI.readReview);
const readMyRecipeReviewSaga = createRequestSaga(READ_RECIPE_REVIEW, reviewAPI.readMyRecipeReview);

export function* reviewSaga() {
  yield takeLatest(READ_REVIEW, readReviewSaga);
  yield takeLatest(READ_RECIPE_REVIEW, readMyRecipeReviewSaga);
}

const initialState = {
  myReviews: null,
  myRecipeReviews: null,
  error: null,
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
    [UNLOAD_REVIEW]: () => initialState,
  },
  initialState,
);

export default review;
