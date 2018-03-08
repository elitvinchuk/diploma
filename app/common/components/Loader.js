import cx from 'classnames'
import { bool } from 'prop-types'
import React from 'react'

const Loader = ({ fullscreen }) => (
  <span className={cx('loader oi oi-sun', { fullscreen })} />
)

Loader.propTypes = {
  fullscreen: bool
}

export default Loader
