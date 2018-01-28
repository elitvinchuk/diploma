import { ANONYMOUS, ATTEMPTING_LOGIN, SIGN_OUT, SIGNED_IN } from 'actions/auth'

const initialState = {
  status: ANONYMOUS,
  email: null,
  displayName: null,
  photoURL: null,
  uid: null
}

export default (state = initialState, action) => {
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

    case SIGNED_IN: {
      return {
        status: SIGNED_IN,
        email: action.email,
        displayName: action.displayName,
        photoURL: action.photoURL,
        uid: action.uid,
        redirectToReferrer: true
      }
    }

    default:
      return state
  }
}