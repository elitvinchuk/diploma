import React from 'react'
import { Modal } from 'common/components'
import { Input } from 'common/form-controls'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import moment from 'moment'

const CourseEditModal = ({ courseId, handleSubmit, initialValues }) => (
  <Modal
    modalId={CourseEditModal.id}
    contentLabel={`${courseId ? 'Редактирование' : 'Добавление'} предмета`}
  >
    <div className="modal-body">
      {courseId && (
        <dl className="row">
          <dt className="col-sm-3">Создан</dt>
          <dd className="col-sm-9">
            Иванов Иван Иванович
            <p className="font-weight-light text-muted font-small">
              <small>
                {moment()
                  .subtract(6, 'days')
                  .calendar()}
              </small>
            </p>
          </dd>

          <dt className="col-sm-3">Изменён</dt>
          <dd className="col-sm-9">
            Петров Пётр Петрович
            <p className="font-weight-light text-muted font-small">
              <small>
                {moment()
                  .subtract(3, 'days')
                  .calendar()}
              </small>
            </p>
          </dd>
        </dl>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          component={Input}
          label="Название дисциплины"
          autoFocus={!courseId}
        />
        <Field name="tutors" component={Input} label="Преподаватели" />
        <Field name="manual" component={Input} label="Методические пособия" />
        <Field name="tasks" component={Input} label="Задания" />
      </form>
    </div>

    <div className="modal-footer">
      <button type="button" className="btn btn-danger">
        <span className="oi oi-trash" />
      </button>
      <button type="submit" className="btn btn-primary">
        Сохранить изменения
      </button>
      <button type="button" className="btn btn-secondary">
        Отмена
      </button>
    </div>
  </Modal>
)

CourseEditModal.propTypes = {
  courseId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
}

CourseEditModal.id = 'course-edit'

export default reduxForm({
  enableReinitialize: true,
  form: CourseEditModal.id
})(CourseEditModal)
