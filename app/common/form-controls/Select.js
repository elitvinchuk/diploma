import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const inputRenderer = props => (
  <div  key="input-wrap" style={{ display: 'inline-block' }}>
    <input id={props.id} {...props} className={'form-control'} />
  </div>
)

const SelectComponent = ({
  input: { name, onChange, value },
  label,
  labelKey,
  meta: { error, touched },
  options
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Select
      name={name}
      multi={true}
      onChange={onChange}
      value={value}
      labelKey={labelKey}
      options={options}
      noResultsText="Результатов нет"
      placeholder="Начните вводить"
      arrowRenderer={null}
      clearAllText="Очистить"
      // inputRenderer={inputRenderer}
      autosize={false}
    />
    {error && touched && <div className="invalid-feedback">{error}</div>}
  </div>
)

SelectComponent.propTypes = {
  input: PropTypes.object,
  labelKey: PropTypes.string,
  options: PropTypes.array.isRequired
}

export default SelectComponent
