import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Label, Tasks } from 'common/components'
import dict from 'common/dictionary'
import ArrangeExam from './ArrangeExam'
import MarkExamPass from './MarkExamPass'

const ApplicationItem = ({ application, course, student, onExamDateSelect, onExamPass }) => (
  <>
    <h1 className="mb-3 mt-3 d-flex">
      <span>{course?.name}</span>
      {application.status && <Label status={application.status} className="ml-auto" />}
    </h1>
    <h4 className="text-muted">
      {student?.displayName} {/* (гр. 321432) */}
    </h4>

    <div className="row mb-3">
      <div className="col-sm-8">
        <dl className="row">
          {typeof application.mark === 'string' && (
            <>
              <dt className="col-sm-4">Оценка</dt>
              <dd className="col-sm-8">{application.mark}</dd>
            </>
          )}
          <dt className="col-sm-4">Первичное обращение</dt>
          <dd className="col-sm-8">
            {moment(application.createdAt).format('Do MMMM YYYY в H:mm')}
          </dd>

          {application.examDate && (
            <>
              <dt className="col-sm-4">Дата зачёта</dt>
              <dd className="col-sm-8">
                {moment(application.examDate).format('Do MMMM YYYY в H:mm')}
              </dd>
            </>
          )}
        </dl>
      </div>
    </div>

    <Tasks tasks={application.tasks} />

    {application.status !== dict.statuses.approved && (
      <div className="row mt-2">
        <div className="col-sm">
          {Object.keys(application.tasks).every(
            taskId => application.tasks[taskId].status === dict.statuses.approved
          ) && <ArrangeExam onExamDateSelect={onExamDateSelect} />}
        </div>
        <div className="col-sm text-right">
          {application.status === dict.statuses.arranged && (
            <MarkExamPass onExamPass={onExamPass} type={course.type} />
          )}
        </div>
      </div>
    )}
  </>
)

ApplicationItem.propTypes = {
  application: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  onExamDateSelect: PropTypes.func.isRequired,
  onExamPass: PropTypes.func.isRequired
}

export default ApplicationItem
