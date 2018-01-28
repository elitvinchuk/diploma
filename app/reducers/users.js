import { ADD_USER } from 'actions/users'
import { clone, extend } from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      return extend(clone(state), { [action.payload.uid]: {
          displayName: action.payload.displayName,
          email: action.payload.email,
          photoURL: action.payload.photoURL
        }})

    default:
      return state
  }
}