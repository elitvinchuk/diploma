import { signOut } from 'actions/auth'
import { connect } from 'react-redux'
import HomeComponent from './components/Home'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(signOut())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
