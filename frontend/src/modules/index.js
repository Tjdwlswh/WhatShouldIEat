import { combineReducers } from 'redux';
import auth from './auth';

//리듀서들 하나로 모아서 useSelector 이용

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
