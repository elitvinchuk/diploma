import cx from 'classnames'
import { bool } from 'prop-types'
import React from 'react'
import Aperture from 'open-iconic/svg/aperture.svg'

const Loader = ({ fullscreen }) => (
  <img src={Aperture} className={cx('loader', {fullscreen})} />
)
{
  /*<div className={cx('loader oi oi-aperture', { fullscreen })} />*/
}

Loader.propTypes = {
  fullscreen: bool
}

export default Loader
