import Logo from 'common/assets/logo.png'
import { Input } from 'common/components'
import { func, object } from 'prop-types'
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, propTypes } from 'redux-form'
import routes from 'routes'
import './styles'

const LoginComponent = ({
  auth,
  error,
  handleSubmit,
  location,
  signInWithGoogle
}) => (
  <div className="form-signin-wrapper">
    {auth.redirectToReferrer && (
      <Redirect to={location.state ? location.state.from : routes.index} />
    )}
    <form className="form-signin" onSubmit={handleSubmit}>
      <div className="text-center mb-4">
        <img className="mb-4" src={Logo} alt="" width="72" height="72" />
        <h1 className="mb-3">Представьтесь, пожалуйста</h1>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Field
        name="email"
        component={Input}
        type="email"
        id="inputEmail"
        label="Адрес электронной почты"
        required
        autoFocus
      />

      <Field
        name="password"
        component={Input}
        type="password"
        id="inputPassword"
        label="Пароль"
        required
      />

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Войти
      </button>
      <hr />
      <button
        className="btn btn-lg btn-secondary btn-block"
        onClick={signInWithGoogle}
      >
        Войти с помощью Google
      </button>
    </form>
  </div>
)

LoginComponent.propTypes = {
  ...propTypes,
  auth: object,
  location: object.isRequired,
  signInWithGoogle: func.isRequired
}

export default LoginComponent
