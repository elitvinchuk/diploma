import React from 'react'
import PropTypes from 'prop-types'
import dictionary from 'common/dictionary'
import Attachments from './components/Attachments'
import Messages from './components/Messages'
import { Label } from 'common/components'
import { connect } from 'react-redux'
import { actions } from 'common/redux/applications'

const TaskCard = ({ appId, dispatch, roles, task, taskId }) => {
  const heading = 'headingThree' // todo: deal with dat
  const setStatus = status => () => dispatch(actions.changeTaskStatus(appId, taskId, status))

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
            {task.status &&
              task.status !== dictionary.statuses.initial && <Label status={task.status} />}
          </button>
        </h5>
      </div>
      <div id={taskId} className="collapse" aria-labelledby={heading} data-parent="#accordion">
        <div className="card-body">
          <Attachments />
          <hr />
          <Messages taskId={taskId} />

          <hr />

          {roles.tutor &&
            task.status === dictionary.statuses.inReview && (
              <div className="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  onClick={setStatus(dictionary.statuses.needsWork)}
                  className="btn btn-secondary"
                >
                  <span className="oi oi-thumb-down" /> На доработку
                </button>
                <button
                  type="button"
                  onClick={setStatus(dictionary.statuses.approved)}
                  className="btn btn-success"
                >
                  <span className="oi oi-thumb-up" /> Зачтено
                </button>
              </div>
            )}

          {roles.student &&
            [dictionary.statuses.needsWork, dictionary.statuses.initial].includes(task.status) && (
              <button
                type="button"
                onClick={setStatus(dictionary.statuses.inReview)}
                className="btn btn-primary btn-lg"
              >
                Отправить на проверку
              </button>
            )}
        </div>
      </div>
    </div>
  )
}

TaskCard.propTypes = {
  appId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  roles: PropTypes.object.isRequired,
  taskId: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { pathname } = state.router.location
  const pathParts = pathname.split('/')
  const lastItemIndex = pathParts.length - 1
  const appId = pathParts[lastItemIndex] || pathParts[lastItemIndex - 1] // todo: deal with trailing slash
  const roles = state.users[state.auth.uid].roles

  return {
    appId,
    roles
  }
}

export default connect(mapStateToProps)(TaskCard)
