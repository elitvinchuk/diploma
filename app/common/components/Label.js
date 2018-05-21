import React from 'react'
import PropTypes from 'prop-types'
import dictionary from 'common/dictionary'
import cx from 'classnames'

const metaMap = {
  [dictionary.statuses.initial]: {
    icon: '',
    color: 'info'
  },
  [dictionary.statuses.needsWork]: {
    icon: 'oi-pencil',
    color: 'warning'
  },
  [dictionary.statuses.inReview]: {
    icon: 'oi-clock',
    color: 'light'
  },
  [dictionary.statuses.approved]: {
    icon: 'oi-check',
    color: 'success'
  }
}

const Label = ({ status }) => (
  <span className={`badge badge-${metaMap[status].color}`} title={status}>
    {status} <span className={cx('oi', metaMap[status].icon)} />
  </span>
)

Label.propTypes = {
  status: PropTypes.string.isRequired
}

export default Label
