import { usersRef } from 'firebaseConfig'

const constants = {
  SET_USERS: 'users/SET_USERS'
}

export const getUsers = () => dispatch => {
  usersRef.get().then(usersSnapshot => {
    const usersMap = {}

    usersSnapshot.forEach(user => {
      usersMap[user.id] = user.data()
    })

    dispatch({
      type: constants.SET_USERS,
      payload: usersMap
    })
  })
}

export const getTutors = () => dispatch => {

}

export default (state = {}, action) => {
  switch (action.type) {
    case constants.SET_USERS: {
      return action.payload // todo: merge here
    }

    default:
      return state
  }
}
