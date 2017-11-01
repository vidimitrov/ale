import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';

const dev = process.env.NODE_ENV !== 'production';

export const initStore = (initialState, options) => {
  const middlewares = [
    thunkMiddleware
  ];

  // Adding middlewares for development purposes
  if (dev) {
    if (!options.isServer) {
      middlewares.push(logger);
    }
  }

  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
}
