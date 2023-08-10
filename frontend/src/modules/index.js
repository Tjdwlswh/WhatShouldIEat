import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import create, { createSaga } from './create';
import post, { postSaga } from './myrecipe';
import posts, { postsSaga } from './myrecipelist';
import update, { updateSaga } from './update';
import review, { reviewSaga } from './review';
import recommend, { recommendSaga } from './recommend';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  create,
  post,
  posts,
  update,
  review,
  recommend,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    createSaga(),
    postSaga(),
    postsSaga(),
    reviewSaga(),
    updateSaga(),
    recommendSaga(),
  ]);
}

export default rootReducer;
