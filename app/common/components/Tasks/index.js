import React from 'react'
import PropTypes from 'prop-types'
import TaskCard from './TaskCard'

const Task = ({ tasks }) => (
  <div id="accordion">
    {Object.keys(tasks).map(taskId => (
      <TaskCard task={tasks[taskId]} taskId={taskId} key={taskId} />
    ))}
  </div>
)

Task.propTypes = {
  tasks: PropTypes.object.isRequired
}

export default Task
