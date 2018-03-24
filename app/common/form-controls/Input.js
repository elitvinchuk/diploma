import React from 'react'
import { func, string } from 'prop-types'
// import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import cx from 'classnames'

const Input = ({ input, label, meta: { error, touched }, ...rest }) => (
  <div className="form-label-group">
    <input
      {...input}
      {...rest}
      id={input.name}
      className={cx('form-control', { 'is-invalid': error && touched })}
      placeholder={label}
    />
    <label htmlFor={input.name}>{label}</label>
    {error && touched && <div className="invalid-feedback">{error}</div>}
  </div>
)

Input.propTypes = {
  // input: fieldInputPropTypes,
  // input: func,
  label: string.isRequired,
  // meta: func
  // meta: fieldMetaPropTypes
}

export default Input
