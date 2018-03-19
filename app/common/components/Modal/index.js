import { connect } from 'react-redux'
import ModalComponent from './component'
import { actions as popupActions, selectors } from '../../redux/modal'
import { submit } from 'redux-form'

const mapStateToProps = (state, ownProps) => ({
  visible: !!selectors.modalIsVisible(state.modal, ownProps.modalId)
})

const mapDispatchToProps = (dispatch, { modalId }) => ({
  handleClose() {
    dispatch(popupActions.close(modalId))
  },
  triggerSubmit() {
    dispatch(submit(modalId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)
