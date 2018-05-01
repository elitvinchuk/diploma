import { applicationsRef } from 'firebaseConfig'

export const types = {
  SET_APPLICATIONS: 'tutor/SET_APPLICATIONS'
}

export const actions = {
  getApplications: () => (dispatch, getState) => {
    const { uid } = getState().auth
    return applicationsRef
      .where('tutorId', '==', uid)
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
  }
}
