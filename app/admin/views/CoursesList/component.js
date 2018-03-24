import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import CourseEditModal from './components/CourseEditModal'

const CourseListComponent = ({
  activeCourseId,
  closeModal,
  courses,
  onDeleteCourse,
  onSubmitCourse,
  openModal,
  searchFilter,
  handleFilterChange
}) => {
  const coursesIds = Object.keys(courses)
  const filteredIds = coursesIds.filter(id =>
    courses[id].name.toUpperCase().includes(searchFilter.toUpperCase())
  )

  return (
    <>
      <h1 className="mb-3 mt-3 display-4">Предметы</h1>

      <div className="input-group input-group-lg mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Поиск"
          aria-label="Поиск"
          value={searchFilter}
          onChange={handleFilterChange}
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
        {filteredIds.map(id => (
          <a
            key={id}
            onClick={openModal(id)}
            href="#"
            className="list-group-item list-group-item-action"
          >
            {courses[id].name}
          </a>
        ))}
      </div>

      <CourseEditModal
        courseId={activeCourseId}
        initialValues={courses[activeCourseId] || {}}
        onSubmit={onSubmitCourse}
        onDeleteCourse={onDeleteCourse}
        closeModal={closeModal}
      />
    </>
  )
}

CourseListComponent.propTypes = {
  closeModal: PropTypes.func,
  searchFilter: PropTypes.string,
  handleFilterChange: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
  onSubmitCourse: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}

export default CourseListComponent
