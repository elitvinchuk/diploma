import React from 'react'
import { Modal } from 'common/components'
import { Input, Select } from 'common/form-controls'
import { required } from 'common/utils/validators'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import moment from 'moment'

const CourseEditModal = ({
  closeModal,
  courseId,
  handleSubmit,
  onDeleteCourse,
  initialValues: { createdAt, createdBy, editedAt, editedBy },
  users
}) => {
  // todo: deal with dat default values
  const iterableTutors = Object.keys(users || {}).reduce((usersArray, userId) => {
    const { displayName, roles } = users[userId]
    if (roles.tutor) {
      usersArray.push({
        value: userId,
        label: displayName
      })
    }

    return usersArray
  }, [])

  return (
    <Modal
      modalId={CourseEditModal.id}
      contentLabel={`${courseId ? 'Редактирование' : 'Добавление'} предмета`}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {courseId && (
            <dl className="row">
              {createdAt && (
                <>
                  <dt className="col-sm-3">Создан</dt>
                  <dd className="col-sm-9">
                    {createdBy}
                    <p className="font-weight-light text-muted font-small">
                      <small>{moment(createdAt).calendar()}</small>
                    </p>
                  </dd>
                </>
              )}

              {editedAt && (
                <>
                  <dt className="col-sm-3">Изменён</dt>
                  <dd className="col-sm-9">
                    {editedBy}
                    <p className="font-weight-light text-muted font-small">
                      <small>{moment(editedAt).calendar()}</small>
                    </p>
                  </dd>
                </>
              )}
            </dl>
          )}

          <Field
            name="name"
            component={Input}
            label="Название дисциплины"
            validate={required}
            autoFocus={!courseId}
          />
          <Field
            name="tutors"
            component={Select}
            label="Преподаватели"
            // normalize={(value, previousValue, allValues, allPreviousValues) =>}
            options={iterableTutors}
            validate={required}
          />
          <Field name="manual" component={Input} label="Методические пособия" validate={required} />
          <Field name="tasks" component={Input} label="Задания" validate={required} />
        </div>

        <div className="modal-footer">
          {courseId && (
            <button onClick={onDeleteCourse(courseId)} type="button" className="btn btn-danger">
              <span className="oi oi-trash" />
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            Сохранить изменения
          </button>
          <button onClick={closeModal} type="button" className="btn btn-secondary">
            Закрыть
          </button>
        </div>
      </form>
    </Modal>
  )
}

CourseEditModal.propTypes = {
  closeModal: PropTypes.func,
  courseId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    createdAt: PropTypes.number,
    createdBy: PropTypes.string,
    editedAt: PropTypes.number,
    editedBy: PropTypes.string
  }),
  users: PropTypes.object
}

CourseEditModal.id = 'course-edit'

export default connect(state => ({
  users: state.users
}))(
  reduxForm({
    enableReinitialize: true,
    form: CourseEditModal.id
  })(CourseEditModal)
)
