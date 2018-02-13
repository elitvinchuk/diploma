import { destroyMessage } from '../actions/messages'
import Messages from 'legacy/components/Messages'
import { connect } from 'react-redux'

const mapStateToProps = ({messages, users, auth}) => {
  return {messages, users, auth}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage (key) {
      return () => dispatch(destroyMessage(key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)