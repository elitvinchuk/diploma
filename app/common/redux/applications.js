import { applicationsRef } from 'firebaseConfig'
import dot from 'dot-prop-immutable'
import { types as studentActionTypes } from 'student/redux/applications'
import { types as tutorActionTypes } from 'tutor/redux/applications'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import dictionary from 'common/dictionary'

const types = {
  ADD_COMMENT: 'applications/ADD_COMMENT',
  CHANGE_TASK_STATUS: 'applications/CHANGE_TASK_STATUS',
  SET_APP_TASKS: 'applications/SET_APP_TASKS',
  ARRANGE_EXAM_DATE: 'applications/ARRANGE_EXAM_DATE',
  SET_EXAM_PASS: 'applications/SET_EXAM_PASS'
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
  changeTaskStatus: (id, taskId, status) => dispatch =>
    applicationsRef
      .doc(`${id}/tasks/${taskId}`)
      .update({ status })
      .then(() => {
        dispatch({
          type: types.CHANGE_TASK_STATUS,
          payload: {
            id,
            taskId,
            status
          }
        })
      }),
  getApplicationDetails: id => dispatch =>
    // todo: consider implementing utilities for retrieving data and collection by link
    applicationsRef
      .doc(id)
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
            id,
            tasks
          }
        })
      }),
  setExamDate: (id, examDate) => dispatch =>
    applicationsRef
      .doc(id)
      .update({
        examDate,
        status: dictionary.statuses.arranged
      })
      .then(() =>
        dispatch({
          type: types.ARRANGE_EXAM_DATE,
          payload: {
            id,
            examDate
          }
        })
      ),
  setExamPass: (id, mark) => dispatch =>
    applicationsRef
      .doc(id)
      .update({
        status: dictionary.statuses.approved,
        mark
      })
      .then(() =>
        dispatch({
          type: types.SET_EXAM_PASS,
          payload: {
            id,
            mark
          }
        })
      )
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

    case types.ARRANGE_EXAM_DATE: {
      // todo: deal with dat horrible double set
      const applicationWithDate = dot.set(state, `${payload.id}.examDate`, payload.examDate)
      return dot.set(applicationWithDate, `${payload.id}.status`, dictionary.statuses.arranged)
    }

    case types.SET_EXAM_PASS: {
      const clone = cloneDeep(state)

      clone[payload.id].status = dictionary.statuses.approved
      clone[payload.id].updatedAt = Date.now()
      clone[payload.id].mark = payload.mark

      return clone
    }

    default:
      return state
  }
}
