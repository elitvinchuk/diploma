import { applicationsRef } from 'firebaseConfig'
import pick from 'lodash/pick'
import { applicationsByCourse } from 'student/utils'

export const types = {
  SET_APPLICATIONS: 'student/SET_APPLICATIONS'
}

export const selectors = {
  getApplicationsMeta(state, assignedCoursesIds) {
    const { applications, courses } = state
    const appsByCourse = applicationsByCourse(applications)

    return assignedCoursesIds.map(courseId => {
      const basicInfo = pick(courses[courseId], ['id', 'name'])
      const appMeta = appsByCourse[courseId]

      if (appMeta) {
        basicInfo.createdAt = appMeta.createdAt
        basicInfo.status = appMeta.status
        basicInfo.updatedAt = appMeta.updatedAt
      }

      return basicInfo
    })
  }
}

export const actions = {
  getApplications: () => (dispatch, getState) => {
    const { uid } = getState().auth
    return applicationsRef
      .where('studentId', '==', uid)
      .get()
      .then(querySnapshot => {
        const applications = {}

        querySnapshot.forEach(app => {
          applications[app.id] = app.data()
        })

        dispatch({
          type: types.SET_APPLICATIONS,
          payload: applications
        })
      })
  }
}
