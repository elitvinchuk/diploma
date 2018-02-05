import { signOut } from 'actions/auth'
import { NavbarToggler } from 'common/components'
import { func, object } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import routes from 'routes'
import Logo from '../assets/logo.png'

const Header = ({auth, signOut}) =>
  <nav className='navbar sticky-top navbar-expand-md navbar-dark bg-dark mb-4'>
    <a className='navbar-brand' href='#'>
      <img src={Logo} height={30}/>
    </a>

    <NavbarToggler>
      <NavLink to={routes.tutors.index} className='nav-item nav-link'>Обращения</NavLink>
      <li className="nav-item">
        <a className="nav-link" href="#">Календарь</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          {/*<span className="oi oi-bell"/> */}Уведомления
          <span className="badge badge-pill badge-success ml-2">3</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          {/*<span className="oi oi-envelope-closed"/> */}Сообщения
          <span className="badge badge-pill badge-success ml-2">3</span>
        </a>
      </li>
    </NavbarToggler>

    <span className='navbar-text'>
      {auth.displayName}
    </span>
    <button className='btn btn-outline-secondary ml-2' onClick={signOut}
            type='button'>
      Выйти
    </button>
  </nav>

Header.propTypes = {
  auth: object.isRequired,
  signOut: func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(signOut())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
