import React from 'react'
import PropTypes from 'prop-types'

class NavbarToggler extends React.Component {
  static propTypes = {}

  render () {
    return (
      <>
        <button className="navbar-toggler"
                type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {this.props.children}
          </ul>
        </div>
      </>
    )
  }
}

export default NavbarToggler
