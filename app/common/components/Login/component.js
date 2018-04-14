import Logo from 'common/assets/logo.png'
import Loader from 'common/components/Loader'
import { Input } from 'common/form-controls'
import { required } from 'common/utils/validators'
import { bool, object } from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, propTypes } from 'redux-form'
import routes from 'routes'
import './styles'

const LoginComponent = ({ auth, attemptingLogin, error, handleSubmit, location }) => (
  <div className="d-flex h-100 justify-content-center align-items-center">
    {auth.redirectToReferrer && (
      <Redirect to={location.state ? location.state.from : routes.applications} />
    )}
    {attemptingLogin ? (
      <Loader fullscreen />
    ) : (
      <form className="jumbotron border border-info" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img className="mb-4 rounded-circle" src={Logo} alt="" width="112" height="112" />
          <h1 className="mb-3">
            Представьтесь,<br /> пожалуйста
          </h1>
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
          label="Адрес электронной почты"
          validate={required}
        />

        <Field
          name="password"
          component={Input}
          type="password"
          label="Пароль"
          validate={required}
        />

        <button
          className="btn btn-lg btn-primary btn-block"
          disabled={attemptingLogin}
          type="submit"
        >
          Войти
        </button>
      </form>
    )}
  </div>
)

LoginComponent.propTypes = {
  // ...propTypes,
  auth: object,
  attemptingLogin: bool,
  location: object.isRequired
}

export default LoginComponent
