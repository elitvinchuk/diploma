import { connect } from 'react-redux'
import { createMessage } from '../actions/messages'
import { clearNewMessage, updateNewMessage } from '../actions/new-message'
import NewMessage from '../components/NewMessage'

const mapStateToProps = ({newMessage, auth}) => {
  return {newMessage, auth}
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange (event) { dispatch(updateNewMessage(event.target.value)) },
    handleSubmit (event, content, uid) {
      event.preventDefault()
      dispatch(createMessage({content, uid}))
      dispatch(clearNewMessage())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)