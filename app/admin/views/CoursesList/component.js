import Loader from 'common/components/Loader'
import PropTypes from 'prop-types'
import React from 'react'

const CourseListComponent = ({ courses, openModal, searchFilter, handleFilterChange }) => {
  // todo: consider moving dat out
  const coursesIds = Object.keys(courses)
  const filteredIds = coursesIds
    .filter(id => courses[id].name.toUpperCase().includes(searchFilter.toUpperCase()))
    .sort((firstId, secondId) => courses[firstId].name.localeCompare(courses[secondId].name))

  return (
    <>
      <h1 className="mb-3 mt-3 display-4">Предметы</h1>

      {/* todo: consider using redux form here */}
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
          <button className="btn btn-outline-success" type="button" onClick={openModal()}>
            Добавить
          </button>
        </div>
      </div>

      {filteredIds.length ? (
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
      ) : (
        <Loader fullscreen />
      )}
    </>
  )
}

CourseListComponent.propTypes = {
  searchFilter: PropTypes.string,
  handleFilterChange: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired
}

export default CourseListComponent
