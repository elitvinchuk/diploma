import { actions } from 'common/redux/auth'
import { connect } from 'react-redux'
import HeaderComponent from './component'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(actions.signOut())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
