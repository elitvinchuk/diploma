import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import modal from './modal'
import { courses, users } from 'admin/redux'

export default combineReducers({
  auth,
  courses,
  modal,
  users,
  form: formReducer,
  router: routerReducer
})
