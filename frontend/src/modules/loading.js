import { createAction, handleActions } from 'redux-actions';

const SET_MESSAGE = 'loading/SET_MESSAGE';
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// export const startLoading = createAction(START_LOADING, requestType => requestType);
export const setLoadingMessage = createAction(SET_MESSAGE);

export const startLoading = createAction(START_LOADING, message => message);

export const finishLoading = createAction(FINISH_LOADING);

const initialState = {
  loading: false,
  message: null,
};

const loading = handleActions(
  {
    [START_LOADING]: (state, { payload: message }) => ({
      ...state,
      // [action.payload]: true,
      loading: true,
      message,
    }),
    [FINISH_LOADING]: state => ({
      ...state,
      // [action.payload]: false,
      loading: false,
      message: null,
    }),
    [SET_MESSAGE]: (state, { payload: message }) => ({
      ...state,
      message,
    }),
  },
  initialState,
);

export default loading;
