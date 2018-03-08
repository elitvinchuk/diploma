import cx from 'classnames'
import { map } from 'lodash'
import { array, func, object, oneOf, string } from 'prop-types'
import React from 'react'

const ButtonGroup = ({
  ariaLabel,
  className,
  onChange,
  options,
  size,
  value
}) => (
  <div
    className={cx('btn-group', className, {
      'btn-group-lg': size === 'big',
      'btn-group-sm': size === 'small'
    })}
    role="group"
    aria-label={ariaLabel}
  >
    {map(options, (label, key) => (
      <button
        key={key}
        type="button"
        className={cx('btn btn-secondary', { active: value.includes(key) })}
        onClick={() => {
          const newValue = [...value]
          const index = newValue.indexOf(key)
          if (~index) {
            newValue.splice(index, 1)
          } else {
            newValue.push(key)
          }

          onChange(newValue, key)
        }}
      >
        {label}
      </button>
    ))}
  </div>
)

ButtonGroup.propTypes = {
  ariaLabel: string,
  className: string,
  onChange: func.isRequired,
  options: object.isRequired,
  size: oneOf(['big', 'small']),
  value: array.isRequired
}

export default ButtonGroup
