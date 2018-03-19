import { auth, usersRef } from 'firebaseConfig'
import { pick } from 'lodash'

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
              payload: user
            })
          } else {
            // todo: add last sign in time
            const newUserData = {
              ...pick(auth, ['displayName', 'email', 'photoURL']),
              roles: []
            }

            // todo: deal with dat merge
            userRef.set(newUserData, { merge: true }).then(() => {
              dispatch({
                type: constants.SIGNED_IN,
                payload: newUserData
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
  isAuthenticated(state) {
    return state.auth.status === constants.SIGNED_IN
  }
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
        ...action.payload,
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
