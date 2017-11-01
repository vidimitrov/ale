import {
  PUSH_ROUTE,
} from '../constants/actionTypes';

export const initialState = {
  currentRoute: {
    pathname: '/',
    query: undefined,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ROUTE:
      return {
        ...state,
        currentRoute: {
          ...action.payload.route,
        },
      }
  }

  return state;
};
