import { connect } from 'react-redux'
import ModalComponent from './component'
import { actions as popupActions, selectors } from './redux'
import { submit } from 'redux-form'

const mapStateToProps = (state, { modalId }) => ({
  visible: !!selectors.modalIsVisible(state.modal, modalId)
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
