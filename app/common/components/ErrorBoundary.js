import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
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
        <>
          <h1>{error}</h1>
          <p>{info}</p>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
