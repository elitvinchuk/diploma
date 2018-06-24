import { auth, usersRef } from 'firebaseConfig'
import { types as appTypes } from './applications'

export const constants = {
  ANONYMOUS: 'auth/ANONYMOUS',
  ATTEMPTING_LOGIN: 'auth/ATTEMPTING_LOGIN',
  SIGNED_IN: 'auth/SIGNED_IN',
  SIGN_OUT: 'auth/SIGN_OUT'
}

export const actions = {
  signInWithCredentials: (email, password) => dispatch => {
    dispatch({
      type: constants.ATTEMPTING_LOGIN
    })

    return auth.signInWithEmailAndPassword(email, password)
  },

  signOut: () => dispatch => {
    dispatch({
      type: constants.ATTEMPTING_LOGIN
    })

    dispatch({
      type: appTypes.CLEAR
    })

    auth.signOut()
  },

  listenToAuthChanges: () => dispatch => {
    auth.onAuthStateChanged(auth => {
      if (auth) {
        const userRef = usersRef.doc(auth.uid)

        userRef.get().then(doc => {
          const user = doc.data()

          if (user) {
            dispatch({
              type: constants.SIGNED_IN,
              payload: doc.id
            })
          } else {
            const newUserData = {
              email: auth.email,
              roles: {}
            }

            usersRef
              .doc(auth.uid)
              .set(newUserData)
              .then(() => {
                dispatch({
                  type: constants.SIGNED_IN,
                  payload: auth.uid
                })
              })
          }
        })
      } else {
        dispatch({
          type: constants.SIGN_OUT
        })
      }
    })
  }
}

export const selectors = {
  getAuthenticatedUser: state => state.users[state.auth.uid],
  isAuthenticated: state => state.auth.status === constants.SIGNED_IN
}

const initialState = {
  status: constants.ANONYMOUS
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ATTEMPTING_LOGIN:
      return {
        status: constants.ATTEMPTING_LOGIN
      }

    case constants.SIGNED_IN: {
      return {
        uid: action.payload,
        status: constants.SIGNED_IN,
        redirectToReferrer: true
      }
    }

    case constants.SIGN_OUT:
      return {
        status: constants.ANONYMOUS
      }

    default:
      return state
  }
}
