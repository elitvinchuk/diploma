import { Select } from 'common/form-controls'
import { arrayToObject, objectToArray } from 'common/utils/converters'
import { required } from 'common/utils/validators'
import React from 'react'
import { Modal } from 'common/components'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

const UserEditModal = ({ courses, handleSubmit }) => {
  const iterableCourses = Object.keys(courses).reduce((coursesArray, courseId) => {
    const { name } = courses[courseId]
    coursesArray.push({
      value: courseId,
      label: name
    })

    return coursesArray
  }, [])

  return (
    <Modal modalId={UserEditModal.id}>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <Field
            name="courses"
            component={Select}
            label="Предметы"
            multi
            normalize={arrayToObject}
            format={objectToArray}
            options={iterableCourses}
            validate={required}
          />
        </div>
      </form>
    </Modal>
  )
}

UserEditModal.propTypes = {}

UserEditModal.id = 'user-edit'

export default reduxForm({
  form: UserEditModal.id
})(UserEditModal)
