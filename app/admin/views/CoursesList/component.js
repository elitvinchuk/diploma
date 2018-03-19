import React from 'react'
import PropTypes from 'prop-types'
import CourseEditModal from './components/CourseEditModal'

const CourseListComponent = ({ courses, handleSubmitCourse, openModal }) => (
  <>
    <h1 className="mb-3">Предметы</h1>
    <button onClick={openModal}>Добавить предмет</button>
    <CourseEditModal onSubmit={handleSubmitCourse} />

    <pre>{JSON.stringify(courses, null, 4)}</pre>
  </>
)

CourseListComponent.propTypes = {
  courses: PropTypes.object.isRequired,
  handleSubmitCourse: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}

export default CourseListComponent
