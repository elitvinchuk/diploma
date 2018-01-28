import { selectors } from 'actions/auth'
import { bool, func } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import routes from 'routes'

@connect((state) => ({
  isAuthenticated: selectors.isAuthenticated(state)
}))
class PrivateRoute extends React.Component {
  static propTypes = {
    isAuthenticated: bool,
    component: func
  }

  render () {
    const {
      isAuthenticated,
      component: Component,
      ...props
    } = this.props

    return (
      <Route {...props} render={
        (props) => (
          isAuthenticated
            ? <Component {...props} />
            : (
              <Redirect to={{
                pathname: routes.tutors.login,
                state: {
                  from: props.location
                }
              }} />
            )
        )}/>
    )
  }
}

export default PrivateRoute
