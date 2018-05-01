import React from 'react'
import PropTypes from 'prop-types'
import dictionary from 'common/dictionary'
import cx from 'classnames'
import Attachments from './components/Attachments'
import Messages from './components/Messages'

const TaskCard = ({ task, taskId }) => {
  const heading = 'headingThree'
  const status = dictionary.statuses[task.status]

  return (
    <div className="card">
      <div className="card-header" id={heading}>
        <h5 className="mb-0">
          <button
            className="btn btn-link btn-block d-flex justify-content-between align-items-center collapsed"
            data-toggle="collapse"
            data-target={'#' + taskId}
            aria-expanded="false"
            aria-controls={taskId}
          >
            {task.name}
            {status && (
              <span
                className="badge badge-light"
                data-toggle="tooltip"
                data-placement="top"
                title={status}
              >
                {status}{' '}
                <span
                  className={cx('oi', { 'oi-clock': task.status === dictionary.statuses.pending })}
                />
              </span>
            )}
          </button>
        </h5>
      </div>
      <div id={taskId} className="collapse" aria-labelledby={heading} data-parent="#accordion">
        <div className="card-body">
          <Attachments />
          <hr />
          <Messages taskId={taskId} />
        </div>
      </div>
    </div>
  )
}

TaskCard.propTypes = {
  taskId: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired
}

export default TaskCard
