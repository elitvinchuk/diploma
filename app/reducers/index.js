import { combineReducers } from 'redux'
import auth from './auth'
import newMessage from './new-message'
import messages from './messages'
import users from './users'

const reducer = combineReducers({
  auth,
  messages,
  newMessage,
  users
})

export default reducer