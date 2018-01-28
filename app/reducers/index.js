import { combineReducers } from 'redux'
import auth from './auth'
// import newMessage from './new-message'
// import messages from './messages'
import users from './users'

import { routerReducer } from 'react-router-redux'

const reducer = combineReducers({
  auth,
  router: routerReducer,
  // messages,
  // newMessage,
  users
})

export default reducer