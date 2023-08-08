import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga, createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { produce } from 'immer';

const CHANGE_FIELD = 'update/CHANGE_FIELD';
const SET_ORIGINAL_POST = 'update/SET_ORIGINAL_POST';

const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createRequestActionTypes('update/UPDATE_POST');

export const setOriginalPost = createAction(SET_ORIGINAL_POST, lastpost => lastpost);
export const updatePost = createAction(
  UPDATE_POST,
  ({ token, foodname, ingredients, recipe, recipeId }) => ({
    token,
    foodname,
    ingredients,
    recipe,
    recipeId,
  }),
);
export const changefield = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form, //lastpost
  key, //(recipe, ingredients, tag, foodname)
  value, //바꾸려는 값
}));

const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);
export function* updateSaga() {
  yield takeLatest(UPDATE_POST, updatePostSaga);
}
const initialState = {
  lastpost: null,
  updateError: null,
  foodname: '',
  ingredients: '',
  recipe: '',
  originalPostId: null,
};

const update = handleActions(
  {
    [SET_ORIGINAL_POST]: (state, { payload: lastpost }) => ({
      ...state,
      lastpost,
      foodname: lastpost.foodname,
      ingredients: lastpost.ingredients,
      recipe: lastpost.recipe,
      originalPostId: lastpost.id,
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [UPDATE_POST_SUCCESS]: (state, { payload: lastpost }) => ({
      ...state,
      lastpost,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: updateError }) => ({
      ...state,
      updateError,
    }),
  },
  initialState,
);

export default update;
