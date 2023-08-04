import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'create/CHANGE_FIELD';

const [CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE] =
  createRequestActionTypes('create/CREATE_POST');

const [SAVE_POST, SAVE_POST_SUCCESS, SAVE_POST_FAILURE] =
  createRequestActionTypes('create/SAVE_POST');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const createPost = createAction(CREATE_POST, ({ ingredients, type, token }) => ({
  ingredients,
  type,
  token,
}));

export const savePost = createAction(
  SAVE_POST,
  ({ foodname, ingredients, recipe, tags, aiRecipeId, token, image }) => ({
    foodname,
    ingredients,
    recipe,
    tags,
    aiRecipeId,
    token,
    image,
  }),
);

const createPostSaga = createRequestSaga(
  CREATE_POST,
  postsAPI.createPost,
  '최대 10초 이상 걸릴 수 있습니다...',
);
const savePostSaga = createRequestSaga(SAVE_POST, postsAPI.savePost);

export function* createSaga() {
  yield takeLatest(CREATE_POST, createPostSaga);
  yield takeLatest(SAVE_POST, savePostSaga);
}

const initialState = {
  type: '',
  ingredients: [],
  myRecipe: null,
  post: null,
  postError: null,
};

const create = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [CREATE_POST]: state => ({
      ...state,
      //초기화시키기
      post: null,
      postError: null,
    }),
    [CREATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [CREATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [SAVE_POST_SUCCESS]: (state, { payload: newRecipe }) => ({
      ...state,
      myRecipe: newRecipe, // 수정된 레시피 서버에 저장 후 반환받은 레시피
      post: null,
    }),
    [SAVE_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      postError: error,
    }),
  },
  initialState,
);

export default create;
