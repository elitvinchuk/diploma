import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import users from 'admin/redux/users'

export default combineReducers({
  auth,
  users,
  form: formReducer,
  router: routerReducer
})
