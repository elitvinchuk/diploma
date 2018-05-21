import { applicationsRef } from 'firebaseConfig'
import dictionary from 'common/dictionary'
import times from 'lodash/times'

export const types = {
  APPLY_FOR_COURSE: 'student/APPLY_FOR_COURSE',
  SET_APPLICATIONS: 'student/SET_APPLICATIONS'
}

const handleSuccessfulTaskAddition = taskMeta => snapshot => ({
  id: snapshot.id,
  ...taskMeta
})

export const actions = {
  getApplications: () => (dispatch, getState) => {
    const { uid } = getState().auth
    return applicationsRef
      .where('studentId', '==', uid)
      .get()
      .then(applicationsSnapshot => {
        const applications = {}

        applicationsSnapshot.forEach(app => {
          applications[app.id] = app.data()
        })

        dispatch({
          type: types.SET_APPLICATIONS,
          payload: applications
        })
      })
  },
  applyForCourse: (course, tutorId) => (dispatch, getState) => {
    const newApplication = {
      courseId: course.id,
      studentId: getState().auth.uid,
      tutorId,
      createdAt: Date.now(),
      status: dictionary.statuses.initial
    }

    // todo: transactions may help
    return applicationsRef.add(newApplication).then(appRef => {
      const promises = []
      const tasksRef = appRef.collection('tasks')

      times(course.controlWorksAmount, index => {
        const controlWorkData = {
          name: 'Контрольная работа №' + (index + 1),
          status: dictionary.statuses.initial
        }

        promises.push(
          tasksRef.add(controlWorkData).then(handleSuccessfulTaskAddition(controlWorkData))
        )
      })

      times(course.individualWorksAmount, index => {
        const individualWorkData = {
          name: 'Индивидуальная работа №' + (index + 1),
          status: dictionary.statuses.initial
        }

        promises.push(
          tasksRef.add(individualWorkData).then(handleSuccessfulTaskAddition(individualWorkData))
        )
      })

      if (course.courseProject) {
        const courseProjectData = {
          name: 'Курсовой проект',
          status: dictionary.statuses.initial
        }

        promises.push(
          tasksRef.add(courseProjectData).then(handleSuccessfulTaskAddition(courseProjectData))
        )
      }

      if (course.courseWork) {
        const courseWorkData = {
          name: 'Курсовая работа',
          status: dictionary.statuses.initial
        }

        promises.push(
          tasksRef.add(courseWorkData).then(handleSuccessfulTaskAddition(courseWorkData))
        )
      }

      return Promise.all(promises).then(tasksArray => {
        const tasks = tasksArray.reduce(
          (tasks, task) => ({
            ...tasks,
            [task.id]: {
              name: task.name
            }
          }),
          {}
        )

        const application = {
          id: appRef.id,
          tasks,
          ...newApplication
        }

        dispatch({
          type: types.APPLY_FOR_COURSE,
          payload: application
        })

        return application.id
      })
    })
  }
}
