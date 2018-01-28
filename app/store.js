import { listenToAuthChanges } from 'actions/auth'
// import { listenToMessagesChange } from 'actions/messages'
// import { listenForUsersChange } from 'actions/users'
// import initialState from 'initialState'
import reducer from 'reducers'
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

const middleware = [routerMiddleware(history), thunk]
const enhancers = []
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  {},
  composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers,
  ),
)

store.dispatch(listenToAuthChanges())
// store.dispatch(listenForUsersChange())
// store.dispatch(listenToMessagesChange())

export default store