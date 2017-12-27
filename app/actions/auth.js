import {auth, googleAuthProvider} from '../firebase'

const ATTEMPTING_LOGIN = 'ATTEMPTING_LOGIN'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

export const signIn = () => {
  return (dispatch) => {
    dispatch({
      type: ATTEMPTING_LOGIN
    })

    auth.signInWithPopup(googleAuthProvider).then(({user}) => {
      console.log(user)
    })
  }
}

export const signOut = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: SIGN_OUT
      })
    })
  }
}