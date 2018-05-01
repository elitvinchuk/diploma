import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import cx from 'classnames'

const Message = ({ createdAt, messageIsFromLoggedInUser, text }) => (
  <blockquote
    className={cx('blockquote', {
      'text-right': messageIsFromLoggedInUser
    })}
  >
    <p className="mb-0">{text}</p>
    <footer className="blockquote-footer">{moment(createdAt).fromNow()}</footer>
  </blockquote>
)

Message.propTypes = {
  createdAt: PropTypes.number.isRequired,
  messageIsFromLoggedInUser: PropTypes.bool,
  text: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  messageIsFromLoggedInUser: state.auth.uid === ownProps.uid
})

export default connect(mapStateToProps)(Message)
