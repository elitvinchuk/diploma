import { signIn, signOut } from 'actions/auth'
import Application from 'components/Application'
import { connect } from 'react-redux'

const mapStateToProps = ({auth}) => ({auth})

const mapDispatchToProps = (dispatch) => ({
  signIn() {
    dispatch(signIn())
  },
  signOut() {
    dispatch(signOut())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Application)