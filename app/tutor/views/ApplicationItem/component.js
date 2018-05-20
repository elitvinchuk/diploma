import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Tasks } from 'common/components'

const ApplicationItem = ({ application, course, student }) => (
  <>
    <h1 className="mb-3 mt-3 d-flex">
      <span>{course?.name}</span>
      <span className="badge badge-secondary ml-auto">{application?.status}</span>
    </h1>
    <h4 className="text-muted">
      {student?.displayName} {/* (гр. 321432) */}
    </h4>

    <div className="row mb-3">
      <div className="col-sm-8">
        <dl className="row">
          <dt className="col-sm-5">Первичное обращение</dt>
          <dd className="col-sm-7">{moment(application.createdAt).format('Do MMMM YYYY')}</dd>

          {application.date && (
            <>
              <dt className="col-sm-5">Дата зачёта</dt>
              <dd className="col-sm-7">{moment(application.date).format('Do MMMM YYYY')}</dd>
            </>
          )}
        </dl>
      </div>
    </div>

    <Tasks tasks={application.tasks} />
  </>
)

ApplicationItem.propTypes = {
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired
}

export default ApplicationItem
