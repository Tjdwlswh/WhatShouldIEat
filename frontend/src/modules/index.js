import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import file from './file';
import loading from './loading';
import user, { userSaga } from './user';
import create, { createSaga } from './create';
import post, { postSaga } from './myrecipe';
import posts, { postsSaga } from './myrecipelist';
import update, { updateSaga } from './update';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  create,
  post,
  posts,
  update,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), createSaga(), postSaga(), postsSaga(), updateSaga()]);
}

export default rootReducer;
