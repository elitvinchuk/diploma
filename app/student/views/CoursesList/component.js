import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const ApplicationsListComponent = ({ applications, onCourseClick, disabled, users }) => (
  <>
    <h1 className="mb-3 mt-3 display-4">Предметы</h1>

    <div className="list-group list-group-flush">
      {applications.map(app => {
        const lastUpdated = app.editedAt || app.createdAt
        const tutorDisplayName = users[app.tutorId]?.displayName

        return (
          <a
            key={app.id}
            onClick={() => {
              onCourseClick(app) // todo: consider curring here
            }}
            href="#"
            className={cx('list-group-item list-group-item-action flex-column align-items-start', {
              disabled
            })}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {app.name}{' '}
                {app.status && <span className="badge badge-secondary">{app.status}</span>}
              </h5>
              {lastUpdated && (
                <small>
                  <span className="oi oi-bell" /> {moment(lastUpdated).fromNow()}
                </small>
              )}
            </div>
            {/* todo: add more details about application(ie. works statuses)  
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
              blandit.
            </p> */}
            {tutorDisplayName && <small>{tutorDisplayName}</small>}
          </a>
        )
      })}
    </div>
  </>
)

ApplicationsListComponent.propTypes = {
  applications: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  onCourseClick: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
}

export default ApplicationsListComponent
