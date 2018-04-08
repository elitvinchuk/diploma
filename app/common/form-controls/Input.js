import React from 'react'
import { func, string } from 'prop-types'
// import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import cx from 'classnames'

const Input = ({ className, input, label, meta: { error, touched }, ...rest }) => (
  <div className={cx('form-group', className)}>
    <label htmlFor={input.name}>{label}</label>
    <input
      {...input}
      {...rest}
      id={input.name}
      className={cx('form-control', { 'is-invalid': error && touched })}
      placeholder={label}
    />
    {error && touched && <div className="invalid-feedback">{error}</div>}
  </div>
)

Input.propTypes = {
  // input: fieldInputPropTypes,
  // input: func,
  className: string,
  label: string.isRequired
  // meta: func
  // meta: fieldMetaPropTypes
}

export default Input
