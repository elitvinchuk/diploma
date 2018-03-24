import { coursesRef, FieldValue } from 'firebaseConfig'

const constants = {
  CREATE: 'courses/CREATE',
  EDIT: 'courses/EDIT',
  DELETE: 'courses/DELETE',
  SET_COURSES: 'courses/SET_COURSES'
}

export const actions = {
  getCourses: () => dispatch => {
    coursesRef.get().then(courses => {
      const coursesMap = {}

      courses.forEach(course => {
        coursesMap[course.id] = {
          ...course.data(),
          id: course.id
        }
      })

      dispatch({
        type: constants.SET_COURSES,
        payload: coursesMap
      })
    })
  },
  createCourse: (courseData, creator) => dispatch => {
    const newCourse = {
      ...courseData,
      createdAt: Date.now(), // todo: update withFieldValue.serverTimestamp(),
      createdBy: creator
    }

    const creationRequest = coursesRef.add(newCourse)
    creationRequest.then(docRef => {
      dispatch({
        type: constants.CREATE,
        payload: {
          ...newCourse,
          id: docRef.id
        }
      })
    })

    return creationRequest
  },
  editCourse: (courseData, editor) => dispatch => {
    const editedCourse = {
      ...courseData,
      editedAt: Date.now(), // todo: update withFieldValue.serverTimestamp(),
      editedBy: editor
    }

    const editionRequest = coursesRef.doc(courseData.id).set(editedCourse)
    editionRequest.then(() => {
      dispatch({
        type: constants.EDIT,
        payload: {
          ...editedCourse,
          id: courseData.id
        }
      })
    })

    return editionRequest
  },
  deleteCourse: courseId => dispatch => {
    const deletionRequest = coursesRef.doc(courseId).delete()
    deletionRequest.then(() => {
      dispatch({
        type: constants.DELETE,
        payload: courseId
      })
    })

    return deletionRequest
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case constants.SET_COURSES:
      return action.payload

    case constants.CREATE:
    case constants.EDIT: {
      const { id, ...data } = action.payload
      return {
        ...state,
        [id]: {
          ...data,
          id
        }
      }
    }

    case constants.DELETE: {
      const courses = { ...state }
      delete courses[action.payload]

      return courses
    }

    default:
      return state
  }
}
