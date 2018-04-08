// todo: handle errors

import { coursesRef, storageRef } from 'firebaseConfig'

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
  createCourse: ({ manual, ...courseData }, creator) => dispatch => {
    const newCourse = {
      ...courseData,
      createdAt: Date.now(), // todo: update withFieldValue.serverTimestamp(),
      createdBy: creator,
      manual: manual.name
    }

    const courseManualUploadTask = storageRef
      .child(/* courseData.id */ `manuals/${manual.name}`) // todo: add manual to with course id folder
      .put(manual)

    const creationRequest = coursesRef.add(newCourse)

    return Promise.all([creationRequest, courseManualUploadTask]).then(docRef => {
      dispatch({
        type: constants.CREATE,
        payload: {
          ...newCourse,
          id: docRef.id
        }
      })
    })
  },
  editCourse: ({ manual, ...courseData }, editor) => dispatch => {
    const editedCourse = {
      ...courseData,
      editedAt: Date.now(), // todo: update withFieldValue.serverTimestamp(),
      editedBy: editor,
      manual: manual.name
    }

    const courseDataRequest = coursesRef.doc(courseData.id).set(editedCourse)
    const courseManualUploadTask = storageRef
      .child(/* courseData.id */ `manuals/${manual.name}`) // todo: add manual to with course id folder
      .put(manual)

    return Promise.all([courseDataRequest, courseManualUploadTask]).then(() => {
      dispatch({
        type: constants.EDIT,
        payload: editedCourse
      })
    })
  },
  deleteCourse: courseId => dispatch => {
    return coursesRef
      .doc(courseId)
      .get()
      .then(course => {
        if (course.exists) {
          const courseData = course.data()

          const courseDataDeletionRequest = coursesRef.doc(courseId).delete()
          const courseManualDeletionTask = storageRef.child(`manuals/${courseData.manual}`).delete()

          return Promise.all([courseDataDeletionRequest, courseManualDeletionTask]).then(() => {
            dispatch({
              type: constants.DELETE,
              payload: courseId
            })
          })
        }
      })
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
