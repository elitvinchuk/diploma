import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

class DownloadButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    isBig: PropTypes.bool,
    text: PropTypes.string.isRequired
  }

  render() {
    const { className, isBig, text } = this.props
    return (
      <button
        type="button"
        className={cx('btn btn-primary', className, {
          'btn-lg': isBig
        })}
      >
        <span className="oi oi-book" /> {text}
      </button>
    )
  }
}

export default DownloadButton
