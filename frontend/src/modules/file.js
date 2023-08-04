import { createAction, handleActions } from 'redux-actions';

const SET_FILE = 'file/SET_FILE';

export const setFile = createAction(SET_FILE, file => file);

const initialState = {
  file: null,
};

const file = handleActions(
  {
    [SET_FILE]: (state, { payload: file }) => ({
      ...state,
      file,
    }),
  },
  initialState,
);

export default file;
