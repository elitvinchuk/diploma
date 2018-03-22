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
    console.log('go error')
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
