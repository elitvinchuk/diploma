import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import modal from '../components/Modal/redux'
import { courses, users } from 'admin/redux'
import applications from './applications'

export default combineReducers({
  applications,
  auth,
  courses,
  modal,
  users,
  form: formReducer,
  router: routerReducer
})
