import { connect } from 'react-redux'
import HomeComponent from './component'

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(HomeComponent)
