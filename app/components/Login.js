import { signIn } from 'actions/auth'
import { func, object } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import routes from 'routes'

const Login = ({ auth, location, signIn }) =>
  <div>
    {auth.redirectToReferrer && <Redirect to={location.state || routes.tutors.index} />}

    {/*<form className='form-signin' onSubmit={signIn}>
      <img className='mb-4' src='https://getbootstrap.com/assets/brand/bootstrap-solid.svg' alt="" width='72' height='72'>
      <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
      <label htmlFor='inputEmail' className='sr-only'>Email address</label>
      <input type='email' id='inputEmail' className='form-control'
             placeholder='Email address' required autoFocus/>
      <label htmlFor='inputPassword' className='sr-only'>Password</label>
      <input type='password' id='inputPassword' className='form-control'
             placeholder='Password' required/>*/}

    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={signIn}>
      Sign in
    </button>
    {/*</form>*/}
  </div>

Login.propTypes = {
  auth: object,
  location: object.isRequired,
  signIn: func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signIn() {
    dispatch(signIn())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
