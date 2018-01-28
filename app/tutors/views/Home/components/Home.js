import { Dropdown, NavbarToggler } from 'common/components'
import { func, object } from 'prop-types'
import React from 'react'
import Logo from '../assets/logo.png'

const HomeComponent = ({auth, signOut}) =>
  <>
    <nav className='navbar sticky-top navbar-expand-md navbar-dark bg-dark'>
      <a className='navbar-brand' href='#'>
        <img src={Logo} height={30}/>
      </a>

      <NavbarToggler>
        <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span className="oi oi-bell"/> Notifications
            <span className="badge badge-pill badge-success ml-2">3</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span className="oi oi-envelope-closed"/> Messages
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
  </>

HomeComponent.propTypes = {
  auth: object.isRequired,
  signOut: func.isRequired,
}

export default HomeComponent
