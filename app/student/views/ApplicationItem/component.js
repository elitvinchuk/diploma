import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DownloadButton, Tasks } from 'common/components'

const ApplicationItemComponent = ({ application, course, tutor }) => (
  <>
    <h1 className="mb-3 mt-3 display-4">{course.name}</h1>
    <h3 className="text-muted">{tutor.displayName}</h3>

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
      <div className="col-sm-4">
        <DownloadButton
          className="float-right"
          isBig
          text="Учебные материалы"
          url={course.manual}
        />
      </div>
    </div>

    <Tasks tasks={application.tasks} />

  </>
)

ApplicationItemComponent.propTypes = {
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired
}

ApplicationItemComponent.defaultProps = {
  course: {},
  tutor: {}
}

export default ApplicationItemComponent
