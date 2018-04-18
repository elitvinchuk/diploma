import { connect } from 'react-redux'
import ModalComponent from './component'
import { actions as modalAction, selectors } from './redux'
import { reduxForm } from 'redux-form'

const mapStateToProps = (state, { form }) => ({
  visible: !!selectors.modalIsVisible(state.modal, form)
})

const mapDispatchToProps = (dispatch, { form, onRequestClose }) => ({
  handleClose() {
    dispatch(modalAction.close(form))
    onRequestClose?.()
  }
})

const onSubmitSuccess = (result, dispatch, props) => {
  // todo: deal with dat copy&paste
  dispatch(modalAction.close(props.form))
  props.onRequestClose?.()
}

export default reduxForm({
  enableReinitialize: true,
  onSubmitSuccess
})(connect(mapStateToProps, mapDispatchToProps)(ModalComponent))
