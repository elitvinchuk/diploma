import { applicationsRef } from 'firebaseConfig'

export const types = {
  SET_APPLICATIONS: 'student/SET_APPLICATIONS'
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
