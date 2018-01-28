import { ANONYMOUS, ATTEMPTING_LOGIN, SIGN_IN, SIGN_OUT, SIGNED_IN } from 'actions/auth'
import initialState from 'initialState'

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case ATTEMPTING_LOGIN:
      return {
        status: ATTEMPTING_LOGIN
      }

    case SIGN_OUT:
      return {
        status: ANONYMOUS,
        email: null,
        displayName: null,
        photoURL: null,
        uid: null
      }

    case SIGN_IN: {
      return {
        status: SIGNED_IN,
        email: action.email,
        displayName: action.displayName,
        photoURL: action.photoURL,
        uid: action.uid
      }
    }

    default:
      return state
  }
}