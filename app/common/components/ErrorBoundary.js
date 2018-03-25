import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {
    error: null,
    info: null
  }

  componentDidCatch(error, info) {
    this.setState({
      error,
      info
    })
  }

  render() {
    const { error, info } = this.state

    if (error) {
      return (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <div className="jumbotron h-50 w-75">
            <h1>
              <span className="oi oi-bug" /> {error.message}
            </h1>
            <code>{info.componentStack}</code>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
