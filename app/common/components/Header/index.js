import { actions } from 'common/redux/auth'
import { connect } from 'react-redux'
import HeaderComponent from './component'

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(actions.signOut())
  }
})

export default connect(null, mapDispatchToProps)(HeaderComponent)
