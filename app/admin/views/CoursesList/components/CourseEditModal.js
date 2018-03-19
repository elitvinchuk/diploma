import React from 'react'
import { Modal } from 'common/components'
import { Input } from 'common/form-controls'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

const CourseEditModal = ({ handleSubmit }) => (
  <Modal
    modalId={CourseEditModal.id}
    contentLabel={`${true ? 'Добавление' : 'Редактирование'} предмета`}
    submitButtonLabel={true ? 'Добавить предмет' : 'Сохранить изменения'}
  >
    <form onSubmit={handleSubmit}>
      <Field name="name" component={Input} label="Название дисциплины:" />
      <Field name="description" component={Input} label="Описание:" />
    </form>
  </Modal>
)

CourseEditModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

CourseEditModal.id = 'course-edit'

export default reduxForm({ form: CourseEditModal.id })(CourseEditModal)
