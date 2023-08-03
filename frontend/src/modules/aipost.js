import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [READ_AIPOST, READ_AIPOST_SUCCESS, READ_AIPOST_FAILURE] =
  createRequestActionTypes('aipost/READ_AIPOST');

const UNLOAD_AIPOST = 'aipost/UNLOAD_AIPOST';
// AI 포스트 페이지 벗어나면 데이터 비워줌

export const readAiPost = createAction(READ_AIPOST, id => id);
export const unloadPost = createAction(UNLOAD_AIPOST);

// const readAiPostSaga = createRequestSaga(READ_AIPOST, postsAPI.readAiPost);

export function* aipostSaga() {
  // yield takeLatest(READ_AIPOST, readAiPostSaga);
}

const initialState = {
  aipost: null,
  error: null,
};

const aipost = handleActions(
  {
    [READ_AIPOST_SUCCESS]: (state, { payload: aipost }) => ({
      ...state,
      aipost,
    }),
    [READ_AIPOST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_AIPOST]: () => initialState,
  },
  initialState,
);

export default aipost;
