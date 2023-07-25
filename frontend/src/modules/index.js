import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import create from './create';
//리듀서들 하나로 모아서 useSelector 이용

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  create,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
