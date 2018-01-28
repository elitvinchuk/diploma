import { func } from 'prop-types'
import React from 'react'

const SignIn = ({signIn}) =>
  <button
    type="button"
    className="btn btn-info btn-lg"
    onClick={signIn}
  >
    Войти
  </button>

SignIn.propTypes = {
  signIn: func.isRequired
}

export default SignIn
