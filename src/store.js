import { createStore, applyMiddleware, Middleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import * as initialStore from './reducers/initialState'
import reducers from './reducers'
import { anaReporter } from './middlewares/anaReporter'

const dev = process.env.NODE_ENV !== 'production'

export const initStore = (initialState, options) => {
  const middlewares: Middleware[] = [
    thunkMiddleware,
  ]

  // Adding middlewares for development purposes
  if (dev) {
    if (!options.isServer) {
      middlewares.push(logger)
    }

    middlewares.push(anaReporter)
  }

  return createStore<initialStore.stateTreeType>(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  )
}
