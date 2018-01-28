import { database } from '../firebase'

const messagesRef = database.ref('messages')

export const addMessage = (key, {content, uid}) => {
  return {
    type: 'ADD_MESSAGE',
    content,
    key,
    timestamp: Date.now(),
    uid
  }
}

export const removeMessage = (key) => {
  return {
    type: 'REMOVE_MESSAGE',
    key
  }
}

export const createMessage = ({content, uid}) =>
  dispatch => {
    const message = {
      content,
      uid,
      timestamp: Date.now()
    }

    messagesRef.push(message)
  }

  // return addMessage(message)


export const destroyMessage = (key) =>
  dispatch => {
    messagesRef.key(key).remove().then(() => {
      dispatch(removeMessage(key))
    })
  }

export const listenToMessagesChange = () =>
  dispatch => {
    messagesRef.on('child_added', (snapshot) => {
      dispatch(addMessage(snapshot.key, snapshot.val()))
    })

    messagesRef.on('child_removed', (snapshot) => {
      dispatch(removeMessage(snapshot.key))
    })
  }