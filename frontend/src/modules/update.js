import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const SET_ORIGINAL_POST = 'update/SET_ORIGINAL_POST';

export const setOriginalPost = createAction(SET_ORIGINAL_POST, lastpost => lastpost);

const initialState = {
  lastpost: null,
};

const update = handleActions(
  {
    [SET_ORIGINAL_POST]: (state, { payload: lastpost }) => ({
      ...state,
      lastpost,
    }),
  },
  initialState,
);

export default update;
