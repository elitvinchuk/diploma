import { applicationsRef } from 'firebaseConfig'
import dot from 'dot-prop-immutable'
import { types as studentActionTypes } from 'student/redux/applications'
import { types as tutorActionTypes } from 'tutor/redux/applications'
import merge from 'lodash/merge'

const types = {
  ADD_COMMENT: 'applications/ADD_COMMENT',
  CHANGE_TASK_STATUS: 'applications/CHANGE_TASK_STATUS',
  SET_APP_TASKS: 'applications/SET_APP_TASKS'
}

export const actions = {
  addComment: (id, message, taskId) => ({
    type: types.ADD_COMMENT,
    payload: {
      id,
      message,
      taskId
    }
  }),
  changeTaskStatus: (appId, taskId, status) => dispatch =>
    applicationsRef
      .doc(`${appId}/tasks/${taskId}`)
      .update({ status })
      .then(() => {
        dispatch({
          type: types.CHANGE_TASK_STATUS,
          payload: {
            id: appId,
            taskId,
            status
          }
        })
      }),
  getApplicationDetails: appId => dispatch =>
    // todo: consider implementing utilities for retrieving data and collection by link
    applicationsRef
      .doc(appId)
      .collection('tasks')
      .get()
      .then(querySnapshot => {
        const tasks = {}

        querySnapshot.forEach(doc => {
          tasks[doc.id] = doc.data()
        })

        dispatch({
          type: types.SET_APP_TASKS,
          payload: {
            tasks,
            id: appId
          }
        })
      })
}

export default (state = {}, { type, payload }) => {
  switch (type) {
    case studentActionTypes.APPLY_FOR_COURSE: {
      return dot.set(state, payload.id, payload)
    }

    case studentActionTypes.SET_APPLICATIONS:
    case tutorActionTypes.SET_APPLICATIONS: {
      return merge({ ...state }, payload)
    }

    case types.SET_APP_TASKS: {
      return dot.merge(state, `${payload.id}.tasks`, payload.tasks)
    }

    case types.CHANGE_TASK_STATUS: {
      return dot.set(state, `${payload.id}.tasks.${payload.taskId}.status`, payload.status)
    }

    case types.ADD_COMMENT: {
      return dot.set(state, `${payload.id}.tasks.${payload.taskId}.messages`, payload.message)
    }

    default:
      return state
  }
}
