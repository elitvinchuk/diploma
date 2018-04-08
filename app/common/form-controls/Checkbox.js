import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Checkbox = ({ className, input, label }) => (
  <div className={cx('form-group', className)}>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={input.name}
        checked={input.value}
        {...input}
      />
      <label className="form-check-label" htmlFor={input.name}>
        {label}
      </label>
    </div>
  </div>
)

Checkbox.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object, // get propType from reduxForm
  label: PropTypes.string.isRequired
}

export default Checkbox
