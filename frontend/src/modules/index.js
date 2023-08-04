import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import create, { createSaga } from './create';
import post, { postSaga } from './recipe';
//리듀서들 하나로 모아서 useSelector 이용

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  create,
  post,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), createSaga(), postSaga()]);
}

export default rootReducer;
