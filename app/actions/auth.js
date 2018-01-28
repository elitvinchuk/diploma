import { pick } from 'lodash'
import { auth, database, googleAuthProvider } from '../firebase'
import registerMessaging from '../requestMessagingPermission'

export const ANONYMOUS = 'ANONYMOUS'
export const ATTEMPTING_LOGIN = 'ATTEMPTING_LOGIN'
export const SIGNED_IN = 'SIGNED_IN'
export const SIGN_OUT = 'SIGN_OUT'

const usersRef = database.ref('users')

export const signIn = () => {
  return (dispatch) => {
    dispatch({
      type: ATTEMPTING_LOGIN
    })

    auth.signInWithPopup(googleAuthProvider)
  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: ATTEMPTING_LOGIN
    })

    auth.signOut()
  }
}

const signedIn = (user) => ({
  type: SIGNED_IN,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  uid: user.uid
})

const signedOut = () => ({
  type: SIGN_OUT
})

export const selectors = {
  isAuthenticated(state) {
    return state.auth.status === SIGNED_IN
  }
}

export const listenToAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
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