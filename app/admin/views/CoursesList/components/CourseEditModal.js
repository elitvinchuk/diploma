import React from 'react'
import { Modal } from 'common/components'
import { Checkbox, File, Input, Select } from 'common/form-controls'
import { required } from 'common/utils/validators'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

const arrayToObject = value =>
  value.reduce((valuesMap, tutor) => {
    valuesMap[tutor.value] = tutor.label

    return valuesMap
  }, {})

const objectToArray = valueMap =>
  valueMap
    ? Object.keys(valueMap).map(value => ({
        label: valueMap[value],
        value
      }))
    : []

const examTypes = [
  {
    value: 'test',
    label: 'Зачёт'
  },
  {
    value: 'diffTest',
    label: 'Дифферинцированный зачёт'
  },
  {
    value: 'exam',
    label: 'Экзамен'
  }
]

const CourseEditModal = ({
  closeModal,
  courseId,
  handleSubmit,
  onDeleteCourse,
  // initialValues: { createdAt, createdBy, editedAt, editedBy },
  users
}) => {
  const iterableTutors = Object.keys(users).reduce((usersArray, userId) => {
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
          {/* Hide under meta collapsible*/}
          {/*courseId && (
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
          )*/}

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
            multi
            normalize={arrayToObject}
            format={objectToArray}
            options={iterableTutors}
            validate={required}
          />
          <Field
            name="manual"
            component={File}
            label="Методические пособия"
            // validate={required}
          />
          <div className="form-row">
            <Field
              name="controlWorksAmount"
              component={Input}
              className="col-md-4"
              type="number"
              label="Контрольные"
              validate={required}
            />
            <Field
              name="individualWorksAmount"
              component={Input}
              className="col-md-4"
              type="number"
              label="Индивидуальные"
              validate={required}
            />
            <Field
              name="courseHourse"
              component={Input}
              className="col-md-4"
              type="number"
              label="Часы"
              validate={required}
            />
          </div>

          <Field
            name="type"
            component={Select}
            label="Тип дисциплины"
            options={examTypes}
            validate={required}
          />

          <div className="form-row">
            <Field
              name="courseProject"
              component={Checkbox}
              label="Курсовой проект"
              className="col-md-6"
            />
            <Field
              name="courseWork"
              component={Checkbox}
              label="Курсовая работа"
              className="col-md-6"
            />
          </div>
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

CourseEditModal.defaultProps = {
  users: {}
}

export default connect(state => ({
  users: state.users
}))(
  reduxForm({
    enableReinitialize: true,
    form: CourseEditModal.id
  })(CourseEditModal)
)
