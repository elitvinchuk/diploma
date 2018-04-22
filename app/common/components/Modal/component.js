import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

const ModalComponent = ({
  children,
  contentLabel,
  handleClose,
  handleSubmit,
  submitButtonText,
  submitting,
  visible
}) => (
  <ReactModal
    isOpen={visible}
    contentLabel={contentLabel}
    onRequestClose={handleClose}
    portalClassName={cx('modal', {
      'd-block': visible
    })}
    overlayClassName="modal-dialog modal-dialog-centered" // todo: deal with out click overlay
    className="modal-content"
    bodyOpenClassName="modal-open"
    htmlOpenClassName={null}
    aria={null}
    role="dialog"
  >
    <div className="modal-header">
      <h5 className="modal-title">{contentLabel}</h5>
      <button type="button" className="close" aria-label="Close" onClick={handleClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="modal-body">{children}</div>

      <div className="modal-footer">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitButtonText}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
          disabled={submitting}
        >
          Отмена
        </button>
      </div>
    </form>
  </ReactModal>
  /*{visible && <div className="modal-backdrop fade show" />}
  </>*/
)

ModalComponent.propTypes = {
  children: PropTypes.node,
  contentLabel: PropTypes.string,
  form: PropTypes.string.isRequired,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
  submitting: PropTypes.bool,
  visible: PropTypes.bool
}

ModalComponent.defaultProps = {
  submitButtonText: 'Сохранить изменения'
}

export default ModalComponent
