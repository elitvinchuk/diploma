import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { Link } from 'react-router-dom'
import routes from 'routes'
import moment from 'moment'

const ApplicationsListComponent = ({ applications, courses, users }) => (
  <>
    <h1 className="mb-3 mt-3 display-4">Обращения</h1>

    {/* <form>
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="Поиск"
      />
    </form> */}

    <div className="list-group list-group-flush">
      {map(applications, (app, index) => (
        <Link
          to={routes.tutors.application.replace(':id', index)}
          key={index}
          className="list-group-item list-group-item-action"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">
              {users[app.studentId].displayName}{' '}
              <span className="badge badge-success">{app.status}</span>
            </h5>
            <small>{moment(app.createdAt).fromNow()}</small>
          </div>
          <p className="mb-1">{courses[app.courseId].name}</p>
          {/*<small>Donec id elit non mi porta.</small>*/}
        </Link>
      ))}
    </div>

    {/* <nav className="mt-4" aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link" href="#" tabIndex="-1">
            Назад
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Далее
          </a>
        </li>
      </ul>
    </nav> */}
  </>
)

ApplicationsListComponent.propTypes = {
  apps: PropTypes.object,
  courses: PropTypes.object,
  users: PropTypes.object
}

export default ApplicationsListComponent
