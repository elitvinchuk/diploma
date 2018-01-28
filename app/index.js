import { listenToAuthChanges } from 'actions/auth'
import { listenToMessagesChange } from 'actions/messages'
import { listenForUsersChange } from 'actions/users'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import Application from './containers/ApplicationContainer'
import initialState from './initialState'
import reducer from './reducers'
import {messaging} from './firebase'

const middleware = [thunk]
const enhancers = []
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers,
  ),
)

store.dispatch(listenToAuthChanges())
store.dispatch(listenForUsersChange())
store.dispatch(listenToMessagesChange())

render(
  <Provider store={store}>
    <Application/>
  </Provider>,
  document.getElementById('root'),
)

messaging.onMessage((payload) => {
  console.log(payload)
})