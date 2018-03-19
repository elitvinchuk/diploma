import { selectors } from 'common/redux/auth'
import { bool, func } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import routes from 'routes'

@connect(state => ({
  isAuthenticated: selectors.isAuthenticated(state)
}))
class PrivateRoute extends React.Component {
  static propTypes = {
    isAuthenticated: bool,
    component: func
  }

  render() {
    const { isAuthenticated, component: Component, ...props } = this.props

    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: routes.login,
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
      />
    )
  }
}

export default PrivateRoute
