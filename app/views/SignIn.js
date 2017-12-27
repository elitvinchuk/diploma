import React from 'react'
import { auth, googleAuthProvider } from '../firebase'

const SignIn = () =>
  <button
    type="button"
    className="btn btn-info btn-lg"
    onClick={() => auth.signInWithPopup(googleAuthProvider)}
  >
    Войти
  </button>

SignIn.propTypes = {}

export default SignIn
