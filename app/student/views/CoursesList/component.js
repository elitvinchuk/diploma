import React from 'react'
import PropTypes from 'prop-types'

const CoursesListComponent = ({ courses }) => (
  <>
    <h1 className="mb-3 mt-3 display-4">Предметы</h1>

    {/*<pre>{JSON.stringify(courses, null, 4)}</pre>*/}
    <div className="list-group list-group-flush">
      {courses.map(course => (
        <a
          key={course.id}
          // onClick={openModal(id)}
          href="#"
          className="list-group-item list-group-item-action"
        >
          {course.name}
        </a>
      ))}
    </div>
  </>
)

CoursesListComponent.propTypes = {
  courses: PropTypes.array
}

export default CoursesListComponent
