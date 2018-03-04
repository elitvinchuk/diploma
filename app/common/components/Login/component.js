import Logo from 'common/assets/logo.png'
import { Input, Loading } from 'common/components'
import { bool, func, object } from 'prop-types'
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, propTypes } from 'redux-form'
import routes from 'routes'
import './styles'

const LoginComponent = ({
  auth,
  attemptingLogin,
  error,
  handleSubmit,
  location
}) => (
  <div className="form-signin-wrapper">
    {auth.redirectToReferrer && (
      <Redirect
        to={location.state ? location.state.from : routes.applications}
      />
    )}
    {attemptingLogin ? (
      <Loading />
    ) : (
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img
            className="mb-4 rounded-circle"
            src={Logo}
            alt=""
            width="112"
            height="112"
          />
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
      </form>
    )}
  </div>
)

LoginComponent.propTypes = {
  ...propTypes,
  auth: object,
  attemptingLogin: bool,
  location: object.isRequired
}

export default LoginComponent
