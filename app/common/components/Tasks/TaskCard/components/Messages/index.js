import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import MessagesComponent from './component'
import { actions } from 'common/redux/applications'
import React from 'react'
import PropTypes from 'prop-types'
import { actions as appActions } from 'common/redux/applications'
import { applicationsRef } from 'firebaseConfig'

const mapStateToProps = (state, ownProps) => {
  const { pathname } = state.router.location
  const pathParts = pathname.split('/')
  const lastItemIndex = pathParts.length - 1
  const appId = pathParts[lastItemIndex] || pathParts[lastItemIndex - 1] // todo: deal with trailing slash
  const messages = state.applications?.[appId].tasks?.[ownProps.taskId]?.messages

  return {
    appId,
    messages,
    form: 'comment-form-' + ownProps.taskId,
    uid: state.auth.uid
  }
}

const reduxFormConfig = {
  onSubmit({ text }, dispatch, { appId, taskId, uid }) {
    return applicationsRef
      .doc(appId)
      .collection(`tasks/${taskId}/messages`)
      .add({
        text,
        uid,
        createdAt: Date.now()
      })
  }
}

@connect(mapStateToProps)
@reduxForm(reduxFormConfig)
class Messages extends React.Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    taskId: PropTypes.string.isRequired
  }

  unsubscribe

  componentDidMount() {
    const { appId, dispatch, taskId } = this.props

    // dispatch(appActions.getMessagesHistory(appId, taskId))

    // todo: consider moving upper to level and listen to multiple tasks
    this.unsubscribe = applicationsRef
      .doc(appId)
      .collection(`tasks/${taskId}/messages`)
      .orderBy('createdAt')
      .onSnapshot(messagesSnapshot => {
        const messages = []
        messagesSnapshot.forEach(message => {
          messages.push({
            id: message.id,
            ...message.data()
          })
        })

        dispatch(appActions.addComment(appId, messages, taskId))
      })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleMessageSend

  render() {
    return <MessagesComponent {...this.props} />
  }
}

export default Messages
