import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import Message from './Message'

const Messages = ({auth, messages, users, deleteMessage}) => (
  <section className="Messages">
    {
      map(messages, (message, key) => (
        <Message
          key={key}
          id={key}
          {...message}
          user={users[message.uid]}
          belongsToCurrentUser={auth.uid && message.uid === auth.uid}
          deleteMessage={deleteMessage(key)}
        />
      ))
    }
  </section>
)

Messages.propTypes = {
  auth: PropTypes.object,
  messages: PropTypes.object,
  users: PropTypes.object,
  deleteMessage: PropTypes.func,
}

export default Messages