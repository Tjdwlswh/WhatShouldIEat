import { createAction, handleActions } from 'redux-actions';

const CHANGE_FIELD = 'create/CHANGE_FIELD';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

const initialState = {
  tags: [],
};

const create = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
  },
  initialState,
);

export default create;
