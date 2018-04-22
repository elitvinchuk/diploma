import React from 'react'
import { func, node, object } from 'prop-types'
import Logo from 'common/assets/logo.png'

const HeaderComponent = ({ children, signOut, user }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">
      <img src={Logo} className="rounded-circle" height={30} width={30} />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">{children}</ul>
      <ul className="navbar-nav">
        {/*<li className="nav-item">
          <a className="nav-link" href="#" title="Уведомления">
            <span className="oi oi-bell" />
            <span className="badge badge-pill badge-success ml-2">3</span>
          </a>
        </li>*/}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {user.displayName || 'Пользователь'}
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            {/*<a className="dropdown-item disabled" href="#">
              <span className="oi oi-cog" /> Настройки
            </a>*/}
            {/*<div className="dropdown-divider" />*/}
            <a className="dropdown-item" href="#" onClick={signOut}>
              <span className="oi oi-account-logout" /> Выйти
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
)

HeaderComponent.propTypes = {
  children: node,
  signOut: func.isRequired,
  user: object.isRequired
}

export default HeaderComponent
