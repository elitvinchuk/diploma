import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import CourseEditModal from './components/CourseEditModal'

const CourseListComponent = ({
  activeCourseId,
  courses,
  onDeleteCourse,
  onSubmitCourse,
  openModal
}) => (
  <>
    <h1 className="mb-3 mt-3 display-4">Предметы</h1>

    <div className="input-group input-group-lg mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Поиск"
        aria-label="Поиск"
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={openModal()}
        >
          Добавить
        </button>
      </div>
    </div>

    <div className="list-group list-group-flush">
      {map(courses, (course, id) => (
        <a
          key={id}
          onClick={openModal(id)}
          href="#"
          className="list-group-item list-group-item-action"
        >
          {course.name}
        </a>
      ))}
    </div>

    <CourseEditModal
      courseId={activeCourseId}
      initialValues={courses[activeCourseId]}
      onSubmit={onSubmitCourse}
    />
  </>
)

CourseListComponent.propTypes = {
  courses: PropTypes.object.isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
  onSubmitCourse: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}

export default CourseListComponent
