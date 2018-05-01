import { applicationsRef } from 'firebaseConfig'
import times from 'lodash/times'
import dot from 'dot-prop-immutable'
import { types as studentActionTypes } from 'student/redux/applications'
import dictionary from 'common/dictionary'

const constants = {
  APPLY_FOR_COURSE: 'applications/APPLY_FOR_COURSE'
}

export const actions = {
  applyForCourse: (course, tutorId) => (dispatch, getState) => {
    const newApplication = {
      courseId: course.id,
      studentId: getState().auth.uid,
      tutorId,
      createdAt: Date.now(),
      tasks: [],
      status: dictionary.statuses.initial
    }

    const newTaskSchema = {
      messages: [],
      status: null,
      attachments: null
    }

    times(course.controlWorksAmount, index => {
      newApplication.tasks.push({
        name: 'Контрольная работа №' + (index + 1),
        ...newTaskSchema
      })
    })

    times(course.individualWorksAmount, index => {
      newApplication.tasks.push({
        name: 'Индивидуальная работа №' + (index + 1),
        ...newTaskSchema
      })
    })

    if (course.courseProject) {
      newApplication.tasks.push({
        name: 'Курсовой проект',
        ...newTaskSchema
      })
    }

    if (course.courseWork) {
      newApplication.tasks.push({
        name: 'Курсовая работа',
        ...newTaskSchema
      })
    }

    applicationsRef.add(newApplication).then(appRef => {
      dispatch({
        type: constants.APPLY_FOR_COURSE,
        payload: {
          id: appRef.id,
          ...newApplication
        }
      })
    })
    // todo: .catch()
  }
}

export default (state = {}, { type, payload }) => {
  switch (type) {
    case constants.APPLY_FOR_COURSE: {
      return dot.set(state, payload.id, payload)
    }

    case studentActionTypes.SET_APPLICATIONS: {
      return { ...state, ...payload }
    }

    default:
      return state
  }
}
