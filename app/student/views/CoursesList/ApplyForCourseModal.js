import { Modal } from 'common/components'
import dict from 'common/dictionary'
import { Select } from 'common/form-controls'
import { objectToValue } from 'common/utils/converters'
import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'

const ApplyForCourseModal = ({ activeCourse, form, onRequestClose, onSubmit, tutorsForCourse }) => (
  <Modal
    form={form}
    contentLabel={activeCourse.name}
    onRequestClose={onRequestClose}
    onSubmit={onSubmit}
    submitButtonText="Зарегистрироваться на курс"
  >
    <Field
      name="tutor"
      component={Select}
      label="Выбор преподователя"
      normalize={objectToValue}
      options={tutorsForCourse}
    />
    <dl className="row">
      <dt className="col-sm-5">Тип дисциплины</dt>
      <dd className="col-sm-7">{dict.examTypes[activeCourse.type]}</dd>

      <dt className="col-sm-5">Учебные часы</dt>
      <dd className="col-sm-7">{activeCourse.courseHours}</dd>
    </dl>

    <hr />

    <p className="lead">Необходимо выполненить следующие работы</p>

    <dl className="row">
      {activeCourse.controlWorksAmount && (
        <>
          <dt className="col-sm-6">Контрольные работы</dt>
          <dd className="col-sm-6">{activeCourse.controlWorksAmount}</dd>
        </>
      )}
      {activeCourse.individualWorksAmount && (
        <>
          <dt className="col-sm-6">Индивидуальные работы</dt>
          <dd className="col-sm-6">{activeCourse.individualWorksAmount}</dd>
        </>
      )}
      {activeCourse.courseProject && <dt className="col-sm-12">Курсовое проектирование</dt>}
      {activeCourse.courseWork && <dt className="col-sm-12">Курсовая работа</dt>}
    </dl>
  </Modal>
)

ApplyForCourseModal.propTypes = {
  activeCourse: PropTypes.object,
  form: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  tutorsForCourse: PropTypes.array
}

ApplyForCourseModal.defaultProps = {
  activeCourse: {}
}

export default ApplyForCourseModal
