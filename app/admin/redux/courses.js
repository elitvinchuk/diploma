import { coursesRef } from 'firebaseConfig'

const constants = {
  CREATE: 'courses/CREATE',
  SET_COURSES: 'courses/SET_COURSES',
  DELETE_COURSE: 'courses/DELETE_COURSE'
}

export const actions = {
  createCourse: course => dispatch =>
    // todo: firebase stuff here
    coursesRef
      // .doc('test1')
      .add(course)
      .then(docRef => {
        console.log(docRef)
        /* dispatch({
          type: constants.CREATE,
          payload: {
            id: docRef
          }
        }) */
      }),
  getCourses: () => dispatch => {
    coursesRef.get().then(courses => {
      const coursesMap = {}

      courses.forEach(course => {
        coursesMap[course.id] = course.data()
      })

      dispatch({
        type: constants.SET_COURSES,
        payload: coursesMap
      })
    })
  },
  deleteCourse: (courseId) => dispatch => {
    // remove callback here
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case constants.SET_COURSES:
      return action.payload

    default:
      return state
  }
}
