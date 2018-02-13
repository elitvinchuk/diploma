import { auth, googleAuthProvider } from '../../firebase'

const constants = {
  ANONYMOUS: 'ANONYMOUS',
  ATTEMPTING_LOGIN: 'ATTEMPTING_LOGIN',
  SIGNED_IN: 'SIGNED_IN',
  SIGN_OUT: 'SIGN_OUT'
}

export const actions = {
  signInWithCredential: (email, password) => dispatch => {
    dispatch({
      type: constants.ATTEMPTING_LOGIN
    })

    return auth.signInWithEmailAndPassword(email, password)
  },
  signInWithGoogle: () => dispatch => {
    dispatch({
      type: constants.ATTEMPTING_LOGIN
    })

    auth.signInWithPopup(googleAuthProvider)
  },

  signOut: () => dispatch => {
    dispatch({
      type: constants.ATTEMPTING_LOGIN
    })

    auth.signOut()
  },

  listenToAuthChanges: () => dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(signedIn(user))

        /*registerMessaging(user)

        usersRef.child(user.uid).
          set(pick(user, ['displayName', 'photoURL', 'email', 'uid']))*/
      } else {
        dispatch(signedOut())
      }
    })
  }
}

const signedIn = user => ({
  type: constants.SIGNED_IN,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  uid: user.uid
})

const signedOut = () => ({
  type: constants.SIGN_OUT
})

export const selectors = {
  isAuthenticated(state) {
    return state.auth.status === constants.SIGNED_IN
  }
}

const initialState = {
  status: constants.ANONYMOUS,
  email: null,
  displayName: null,
  photoURL: null,
  uid: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ATTEMPTING_LOGIN:
      return {
        status: constants.ATTEMPTING_LOGIN
      }

    case constants.SIGN_OUT:
      return {
        status: constants.ANONYMOUS,
        email: null,
        displayName: null,
        photoURL: null,
        uid: null
      }

    case constants.SIGNED_IN: {
      return {
        status: constants.SIGNED_IN,
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
