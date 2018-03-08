import React from 'react'
import { array, string } from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

const PrivateLink = ({ label, role, to, userRoles }) =>
  userRoles.includes(role) && (
    <NavLink to={to} className="nav-item nav-link">
      {label}
    </NavLink>
  )

PrivateLink.propTypes = {
  label: string.isRequired,
  role: string.isRequired,
  to: string.isRequired,
  userRoles: array.isRequired
}

const mapStateToProps = state => ({
  userRoles: state.auth.roles
})

export default withRouter(connect(mapStateToProps)(PrivateLink))
