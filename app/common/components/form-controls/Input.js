import React from 'react'
import { string } from 'prop-types'
import { propTypes } from 'redux-form'
import cx from 'classnames'

const Input = ({ id, input, label, meta: { error, touched }, ...rest }) => (
  <div className="form-label-group">
    <input
      {...input}
      {...rest}
      id={id}
      className={cx('form-control', { 'is-invalid': error })}
      placeholder={label}
    />
    <label htmlFor={id}>{label}</label>
    {error && touched && <div className="invalid-feedback">{error}</div>}
  </div>
)

Input.propTypes = {
  // ...propTypes,
  id: string.isRequired,
  label: string.isRequired
}

export default Input
