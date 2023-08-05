import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import create, { createSaga } from './create';

import post, { postSaga } from './myrecipe';
import posts, { postsSaga } from './myrecipelist';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  create,
  post,
  posts,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), createSaga(), postSaga(), postsSaga()]);
}

export default rootReducer;
