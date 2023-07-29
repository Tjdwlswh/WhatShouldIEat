import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// export const startLoading = createAction(START_LOADING, requestType => requestType);
export const startLoading = createAction(START_LOADING);

export const finishLoading = createAction(FINISH_LOADING);

const initialState = {
  loading: false,
};

const loading = handleActions(
  {
    [START_LOADING]: state => ({
      ...state,
      // [action.payload]: true,
      loading: true,
    }),
    [FINISH_LOADING]: state => ({
      ...state,
      // [action.payload]: false,
      loading: false,
    }),
  },
  initialState,
);

export default loading;
