import PropTypes from 'prop-types'
import React from 'react'
import ReactModal from 'react-modal'
import cx from 'classnames'

const ModalComponent = ({
  children,
  contentLabel,
  handleClose,
  onAfterOpen,
  // triggerSubmit,
  visible
}) => (
  <>
    <ReactModal
      isOpen={visible}
      onAfterOpen={onAfterOpen}
      contentLabel={contentLabel}
      portalClassName={cx('modal', {
        'd-block': visible
      })}
      overlayClassName="modal-dialog modal-dialog-centered"
      className="modal-content"
      bodyOpenClassName="modal-open"
      htmlOpenClassName={null}
      aria={null}
      role="dialog"
    >
      <div className="modal-header">
        <h5 className="modal-title">{contentLabel}</h5>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={handleClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      {children}

      {/*<div className="modal-body">{children}</div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={triggerSubmit}
        >
          Сохранить изменения
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
        >
          Отмена
        </button>
      </div>*/}
    </ReactModal>
    {visible && <div className="modal-backdrop fade show" />}
  </>
)

ModalComponent.propTypes = {
  children: PropTypes.node,
  contentLabel: PropTypes.string,
  handleClose: PropTypes.func,
  modalId: PropTypes.string.isRequired,
  onAfterOpen: PropTypes.func,
  // triggerSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}

ModalComponent.setAppElement = ReactModal.setAppElement

export default ModalComponent
