import { Modal } from 'common/components'
import dictionary from 'common/dictionary'
import { Checkbox, File, Input, Select } from 'common/form-controls'
import { flattenArray, objectToArray, objectToValue } from 'common/utils/converters'
import { required } from 'common/utils/validators'
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

const examTypes = objectToArray(dictionary.examTypes)

const CourseEditModal = ({ course, form, onRequestClose, onSubmit, tutorsArray }) => (
  <Modal
    form={form}
    contentLabel={`${course ? 'Редактирование' : 'Добавление'} предмета`}
    initialValues={course}
    onRequestClose={onRequestClose}
    onSubmit={onSubmit}
  >
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
      autoFocus={!course}
    />
    <Field
      name="tutors"
      component={Select}
      label="Преподаватели"
      multi
      normalize={flattenArray}
      options={tutorsArray}
      validate={required}
    />
    <Field name="manual" component={File} label="Методические пособия" />
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
        name="courseHours"
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
      label="Вид контроля"
      normalize={objectToValue}
      options={examTypes}
      // validate={required}
    />

    <div className="form-row">
      <Field
        name="courseProject"
        component={Checkbox}
        label="Курсовой проект"
        className="col-md-6"
      />
      <Field name="courseWork" component={Checkbox} label="Курсовая работа" className="col-md-6" />
    </div>
  </Modal>
)

CourseEditModal.propTypes = {
  course: PropTypes.object,
  form: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  tutorsArray: PropTypes.array
}

export default CourseEditModal
