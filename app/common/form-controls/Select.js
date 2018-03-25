import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const SelectComponent = ({
  input: { name, onChange, value },
  label,
  meta: { error, touched },
  options
}) => (
  <div className="form-label-group">
    <Select
      name={name}
      multi={true}
      onChange={onChange}
      value={value}
      className="form-control"
      options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
    />
    <label htmlFor={name}>{label}</label>
    {error && touched && <div className="invalid-feedback">{error}</div>}
  </div>
)

SelectComponent.propTypes = {
  input: PropTypes.object,
  options: PropTypes.array.isRequired
}

export default SelectComponent
