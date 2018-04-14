import reducers from 'common/redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

export const history = createHistory()

const middleware = [routerMiddleware(history), thunk]
const enhancers = []
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
)

export default store
